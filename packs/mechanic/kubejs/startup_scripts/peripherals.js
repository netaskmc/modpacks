const BigDecimal = Java.loadClass("java.math.BigDecimal");

const bd = (n) => new BigDecimal(n.toString());

/** @type {{[id: string]: (s: Internal.ItemStack) => Internal.BigDecimal}} */
const monetaryValues = {
  "jackseconomy:penny": (stack) => bd(stack.count).multiply(bd(0.01)),
  "jackseconomy:nickel": (stack) => bd(stack.count).multiply(bd(0.05)),
  "jackseconomy:dime": (stack) => bd(stack.count).multiply(bd(0.1)),
  "jackseconomy:quarter": (stack) => bd(stack.count).multiply(bd(0.25)),
  "jackseconomy:dollar_bill": (stack) => bd(stack.count).multiply(bd(1)),
  "jackseconomy:five_dollar_bill": (stack) => bd(stack.count).multiply(bd(5)),
  "jackseconomy:ten_dollar_bill": (stack) => bd(stack.count).multiply(bd(10)),
  "jackseconomy:twenty_dollar_bill": (stack) =>
    bd(stack.count).multiply(bd(20)),
  "jackseconomy:fifty_dollar_bill": (stack) => bd(stack.count).multiply(bd(50)),
  "jackseconomy:hundred_dollar_bill": (stack) =>
    bd(stack.count).multiply(bd(100)),
  "jackseconomy:thousand_dollar_bill": (stack) =>
    bd(stack.count).multiply(bd(1000)),
  "jackseconomy:check": (stack) => bd(stack.getNbt().getString("Balance")),
};

ComputerCraftEvents.peripheral((event) => {
  event
    .registerPeripheral("money_counter", "kubejs:money_counter")
    .mainThreadMethod("moneyValue", (container, direction, arguments) => {
      /** @type {Internal.BlockEntity} */
      let be = container.getEntity();

      let total = bd(0);
      for (let i = 0; i < be.inventory.getSlots(); i++) {
        /** @type {Internal.ItemStack} */
        let stack = be.inventory.getStackInSlot(i);
        if (stack.isEmpty()) continue;
        let id = stack.getId();
        if (monetaryValues[id]) {
          total = total.add(monetaryValues[id](stack));
        }
      }
      return total.toString();
    })
    .mainThreadMethod(
      "dumpDownAndCount",
      (container, direction, arguments, computer, ctx) => {
        // this method transfers all items from the container to the inventory to the bottom of itself,
        // and returns the total value of the items transferred
        /** @type {Internal.BlockEntity} */
        let be = container.getEntity();

        /** @type {Internal.BlockEntity} */
        let target = container.down.getEntity();

        // try getting target inventory size
        try {
          let targetSize = target.inventory.getSlots();
          if (targetSize === 0) {
            throw 1; // whatever, just throw
          }
        } catch (e) {
          throw new Error(
            "Block to the bottom of the counter must be a counter as well!"
          );
        }

        // now we know the target is an inventory

        let total = bd(0);
        for (let i = 0; i < be.inventory.getSlots(); i++) {
          /** @type {Internal.ItemStack} */
          let stack = be.inventory.getStackInSlot(i);
          if (stack.isEmpty()) continue;
          let id = stack.getId();

          /** @type {Internal.ItemStack} */
          let transferredStack = be.inventory.extractItem(
            i,
            stack.count,
            false
          );
          /** @type {Internal.ItemStack} */
          let remainingStack = target.inventory.insertItem(
            transferredStack,
            false
          );
          be.setChanged();
          target.setChanged();

          if (!remainingStack.isEmpty()) {
            // if the target inventory is full, return the remaining items back to the source
            be.inventory.insertItem(remainingStack, false);
            be.setChanged();
            transferredStack.count -= remainingStack.count;
          }

          if (monetaryValues[id]) {
            total = total.add(monetaryValues[id](transferredStack));
          }
        }

        return total.toString();
      }
    );
});
