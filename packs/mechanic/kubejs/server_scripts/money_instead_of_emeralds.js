// MoreJSEvents.villagerTrades((event) => {
//     const professions = VillagerUtils.getProfessions()
//     event.forEachTrades(professions, [0, 100], (trades) => {
//         trades.forEach((trade) => {

//         })
//     })

// });

MoreJSEvents.playerStartTrading((event) => {
  event.forEachOffers((offer) => {
    offer.replaceEmeralds(Item.of("jackseconomy:ten_dollar_bill"));
  });
});

LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.CHEST) // or multiple LootType.BLOCK, LootType.ENTITY ...
    .replaceLoot(
      Item.of("minecraft:emerald"),
      Item.of("jackseconomy:ten_dollar_bill"),
      true
    )
    .addWeightedLoot([
      Item.empty.withChance(2),
      Item.of("jackseconomy:one_dollar_bill").withChance(2),
      Item.of("jackseconomy:five_dollar_bill").withChance(1),
      Item.of("jackseconomy:twenty_dollar_bill").withChance(0.5),
      Item.of("jackseconomy:fifty_dollar_bill").withChance(0.1),
      Item.of("jackseconomy:hundred_dollar_bill").withChance(0.03),
      Item.of("jackseconomy:thousand_dollar_bill").withChance(0.005),
    ]);
});
