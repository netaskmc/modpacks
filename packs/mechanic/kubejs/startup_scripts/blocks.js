const moneyCounterAcceptsIds = [
  "jackseconomy:penny",
  "jackseconomy:nickel",
  "jackseconomy:dime",
  "jackseconomy:quarter",
  "jackseconomy:dollar_bill",
  "jackseconomy:five_dollar_bill",
  "jackseconomy:ten_dollar_bill",
  "jackseconomy:twenty_dollar_bill",
  "jackseconomy:fifty_dollar_bill",
  "jackseconomy:hundred_dollar_bill",
  "jackseconomy:thousand_dollar_bill",
  "jackseconomy:check",
];
const moneyCounterAcceptsId = (id) => moneyCounterAcceptsIds.indexOf(id) !== -1;
const moneyCounterInvSize = [9, 3];

// REGISTRY

StartupEvents.registry("block", (e) => {
  e.create("money_counter")
    .hardness(1.0)
    .resistance(1.0)

    .property(BlockProperties.FACING)
    .defaultState((ctx) => {
      return ctx.set(BlockProperties.FACING, Direction.NORTH);
    })
    .placementState((ctx) => {
      let dir = ctx.getHorizontalDirection().getOpposite();

      return ctx.set(BlockProperties.FACING, dir);
    })

    // .textureAll("kubejs:block/money_counter")

    // .model("kubejs:block/money_counter")

    .blockEntity((bei) => {
      bei.inventory(
        moneyCounterInvSize[0],
        moneyCounterInvSize[1],
        Ingredient.custom((stack) => moneyCounterAcceptsId(stack.id))
      );
      bei.rightClickOpensInventory();
      bei.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .getSlots(() => moneyCounterInvSize[0] * moneyCounterInvSize[1])
          .extractItem((be, slot, amount, simulate) => {
            /** @type {Internal.ItemStack} */
            let item = be.inventory.getStackInSlot(slot);

            let realAmount = amount;
            if (realAmount > item.count) {
              realAmount = item.count;
            }
            be.inventory.extractItem(slot, realAmount, simulate);
            if (!simulate) {
              be.inventory.setChanged();
            }

            let dropped = item.copy();
            dropped.count = realAmount;
            return item;
          })
          .insertItem((be, slot, stack, simulate) => {
            if (!moneyCounterAcceptsId(stack.id)) {
              return stack;
            }
            stack = insertItemStacked(be.inventory, stack, simulate);
            if (!simulate) {
              be.inventory.setChanged();
            }
            return stack;
          })
          .isItemValid(
            (be, slot, stack) =>
              moneyCounterAcceptsId(stack.id) &&
              (canItemStacksStackRelaxed(
                be.inventory.getStackInSlot(slot),
                stack
              ) ||
                be.inventory.getStackInSlot(slot).isEmpty())
          )
          .getSlots((be) => {
            return be.inventory.getSlots();
          })
          .getStackInSlot((be, slot) => {
            return be.inventory.getStackInSlot(slot);
          })
      );
      bei.enableSync();
    });

  e.create("gold_casing").textureAll("kubejs:block/gold_casing");
});

// PORTED FROM FORGE

/**
 * @param {Internal.ItemStack} a
 * @param {Internal.ItemStack} b
 * @returns {boolean}
 */
function canItemStacksStackRelaxed(a, b) {
  if (a.isEmpty() || b.isEmpty() || a.getItem() != b.getItem()) return false;
  if (!a.isStackable()) return false;

  if (a.hasNBT() != b.hasNBT()) return false;

  return (
    (!a.hasNBT() || a.getNbt().equals(b.getNbt())) && a.areCapsCompatible(b)
  );
}

/**
 * @param inventory
 * @param {Internal.ItemStack} stack
 * @param {boolean} simulate
 * @returns {Internal.ItemStack} The remainder of the stack that could not be inserted
 */
function insertItem(dest, stack, simulate) {
  if (dest == null || stack.isEmpty()) return stack;

  for (let i = 0; i < dest.getSlots(); i++) {
    stack = dest.insertItem(i, stack, simulate);
  }

  return stack;
}

/**
 * @param inventory
 * @param {Internal.ItemStack} stack
 * @param {boolean} simulate
 * @returns {Internal.ItemStack} The remainder of the stack that could not be inserted
 */
function insertItemStacked(inventory, stack, simulate) {
  if (!inventory || stack.isEmpty()) {
    return stack;
  }
  // not stackable -> just insert into a new slot
  if (!stack.isStackable()) {
    return insertItem(inventory, stack, simulate);
  }

  let sizeInventory = inventory.getSlots();

  for (let i = 0; i < sizeInventory; i++) {
    let slot = inventory.getStackInSlot(i);
    if (canItemStacksStackRelaxed(slot, stack)) {
      stack = inventory.insertItem(i, stack, simulate);
    }
    if (stack.isEmpty()) {
      break;
    }
  }
  // insert remainder into empty slots
  if (!stack.isEmpty()) {
    // find empty slot
    for (let i = 0; i < sizeInventory; i++) {
      if (inventory.getStackInSlot(i).isEmpty()) {
        stack = inventory.insertItem(i, stack, simulate);
        if (stack.isEmpty()) {
          break;
        }
      }
    }
  }
  return stack;
}
