ServerEvents.recipes((event) => {
  // craft computer chip
  event.custom({
    type: "create:sequenced_assembly",
    ingredient: {
      tag: "forge:plates/copper",
    },

    loops: 2,

    sequence: [
      {
        type: "create:deploying",
        ingredients: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
          {
            item: "create:precision_mechanism",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
      },
      {
        type: "create:deploying",
        ingredients: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
          {
            item: "create:electron_tube",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
      },
      {
        type: "create_new_age:energising",
        energy_needed: 500,
        ingredients: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
      },
      {
        type: "create:pressing",
        ingredients: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_computer_chip",
          },
        ],
      },
    ],

    results: [
      {
        item: "kubejs:computer_chip",
      },
    ],
    transitionalItem: {
      item: "kubejs:incomplete_computer_chip",
    },
  });
  // craft advanced computer chip
  event.custom({
    type: "create:sequenced_assembly",
    ingredient: {
      tag: "forge:plates/copper",
    },

    loops: 2,

    sequence: [
      {
        type: "create:deploying",
        ingredients: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
          {
            item: "kubejs:computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
      },
      {
        type: "create:deploying",
        ingredients: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
          {
            item: "kubejs:computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
      },
      {
        type: "create_new_age:energising",
        energy_needed: 2000,
        ingredients: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
      },
      {
        type: "create:pressing",
        ingredients: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
        results: [
          {
            item: "kubejs:incomplete_advanced_computer_chip",
          },
        ],
      },
    ],

    results: [
      {
        item: "kubejs:advanced_computer_chip",
      },
    ],
    transitionalItem: {
      item: "kubejs:incomplete_advanced_computer_chip",
    },
  });

  // craft computer screen
  event.custom({
    type: "create:mechanical_crafting",
    pattern: [" PPP ", "SSSSS", "NNNNN", "RCCCR", " RLR "],
    key: {
      P: {
        tag: "forge:glass_panes",
      },
      S: {
        item: "create_things_and_misc:rose_quartz_sheet",
      },
      N: {
        item: "create:nixie_tube",
      },
      R: {
        item: "minecraft:redstone",
      },
      C: {
        tag: "forge:plates/copper",
      },
      L: {
        item: "create:rose_quartz_lamp",
      },
    },
    result: {
      item: "kubejs:computer_screen",
      count: 3,
    },
    acceptMirrored: true,
  });

  // craft advanced computer screen
  event.custom({
    type: "create:mechanical_crafting",
    pattern: [" RGB ", "SDDDS", "SCWCS"],
    key: {
      S: {
        tag: "forge:plates/gold",
      },
      W: {
        item: "minecraft:redstone",
      },
      C: {
        tag: "forge:plates/copper",
      },
      D: {
        item: "kubejs:computer_screen",
      },
      R: {
        item: "minecraft:red_stained_glass_pane",
      },
      G: {
        item: "minecraft:lime_stained_glass_pane",
      },
      B: {
        item: "minecraft:blue_stained_glass_pane",
      },
    },
    result: {
      item: "kubejs:advanced_computer_screen",
      count: 3,
    },
    acceptMirrored: true,
  });

  // craft computer
  event.remove({ output: "computercraft:computer_normal" });
  event.shaped(
    Item.of("computercraft:computer_normal"),
    ["BSB", "CRC", "RAR"],
    {
      C: "kubejs:computer_chip",
      S: "kubejs:computer_screen",
      R: "minecraft:redstone",
      A: "create:andesite_casing",
      B: "minecraft:stone_button",
    }
  );

  // craft advanced computer
  event.remove({ output: "computercraft:computer_advanced" });
  event.shaped(
    Item.of("computercraft:computer_advanced"),
    ["BSB", "CRC", "RAR"],
    {
      C: "kubejs:advanced_computer_chip",
      S: "kubejs:advanced_computer_screen",
      R: "minecraft:redstone",
      A: "create:brass_casing",
      B: "minecraft:stone_button",
    }
  );

  // craft monitor
  event.remove({ output: "computercraft:monitor_normal" });
  event.shaped(Item.of("computercraft:monitor_normal"), [" S ", "RCR", " A "], {
    C: "kubejs:computer_chip",
    S: "kubejs:computer_screen",
    R: "minecraft:redstone",
    A: "create:andesite_casing",
  });

  // craft advanced monitor
  event.remove({ output: "computercraft:monitor_advanced" });
  event.shaped(
    Item.of("computercraft:monitor_advanced"),
    [" S ", "RCR", " A "],
    {
      C: "kubejs:computer_chip",
      S: "kubejs:advanced_computer_screen",
      R: "minecraft:redstone",
      A: "create:brass_casing",
    }
  );

  // craft pocket computer
  event.remove({ id: "computercraft:pocket_computer_normal" });
  event.custom({
    type: "create:pressing",
    ingredients: [
      {
        item: "computercraft:computer_normal",
      },
    ],
    results: [
      {
        item: "computercraft:pocket_computer_normal",
      },
    ],
  });

  // craft advanced pocket computer
  event.remove({ id: "computercraft:pocket_computer_advanced" });
  event.remove({ id: "computercraft:pocket_computer_advanced_upgrade" });
  event.custom({
    type: "create:pressing",
    ingredients: [
      {
        item: "computercraft:computer_advanced",
      },
    ],
    results: [
      {
        item: "computercraft:pocket_computer_advanced",
      },
    ],
  });

  // craft turtle
  event.remove({ id: "computercraft:turtle_normal" });
  event.shaped(Item.of("computercraft:turtle_normal"), ["WEW", "SCS", "WSW"], {
    C: "computercraft:computer_normal",
    W: "create:cogwheel",
    S: "create:shaft",
    E: "create_sa:heat_engine",
  });

  // craft advanced turtle
  event.remove({ id: "computercraft:turtle_advanced" });
  event.remove({ id: "computercraft:turtle_advanced_upgrade" });
  event.shaped(
    Item.of("computercraft:turtle_advanced"),
    ["WEW", "SCS", "WSW"],
    {
      C: "computercraft:computer_advanced",
      W: "create:cogwheel",
      S: "create:shaft",
      E: "create_sa:heat_engine",
    }
  );

  // craft modem
  event.remove({ id: "computercraft:wired_modem" });
  event.shaped(Item.of("computercraft:wired_modem"), ["RWR", "RCR", "RWR"], {
    C: "kubejs:computer_chip",
    R: "create:copper_nugget",
    W: "create_new_age:copper_wire",
  });

  // craft wireless modem
  event.remove({ id: "computercraft:wireless_modem_normal" });
  event.shaped(
    Item.of("computercraft:wireless_modem_normal"),
    ["WRW", "WCW", "WRW"],
    {
      C: "computercraft:wired_modem",
      R: "minecraft:ender_pearl",
      W: "create_new_age:copper_wire",
    }
  );

  // craft advanced wireless modem
  event.remove({ id: "computercraft:wireless_modem_advanced" });
  event.shaped(
    Item.of("computercraft:wireless_modem_advanced"),
    ["RUR", "WCW", "WRW"],
    {
      C: "computercraft:wireless_modem_normal",
      R: "minecraft:ender_eye",
      W: "create_new_age:copper_wire",
      U: "kubejs:advanced_computer_chip",
    }
  );

  // craft cable
  event.remove({ id: "computercraft:cable" });
  event.shaped(Item.of("computercraft:cable", 8), ["WWW", "WRW", "WWW"], {
    W: "create_new_age:copper_wire",
    R: "minecraft:redstone",
  });

  // craft speaker
  event.remove({ id: "computercraft:speaker" });
  event.shapeless(Item.of("computercraft:speaker"), [
    "create_things_and_misc:brass_speaker",
    "create:brass_casing",
    "kubejs:computer_chip",
  ]);

  // craft disk drive
  event.remove({ id: "computercraft:disk_drive" });
  event.shaped(Item.of("computercraft:disk_drive"), ["WCW", "RRR", "RAR"], {
    C: "kubejs:computer_chip",
    R: "create:copper_nugget",
    W: "create_new_age:copper_wire",
    A: "create:andesite_casing",
  });

  // craft printer
  event.remove({ id: "computercraft:printer" });
  event.shaped(Item.of("computercraft:printer"), ["WCW", "IHI", "WAW"], {
    C: "kubejs:computer_chip",
    W: "create_new_age:copper_wire",
    H: "create:brass_hand",
    I: "minecraft:black_dye",
    A: "create:andesite_casing",
  });

  // craft gold casing from stripped logs
  event.custom({
    type: "create:item_application",
    ingredients: [
      {
        tag: "forge:stripped_logs",
      },
      {
        item: "minecraft:gold_ingot",
      },
    ],
    results: [
      {
        item: "kubejs:gold_casing",
      },
    ],
  });

  // craft gold casing from wood
  event.custom({
    type: "create:item_application",
    ingredients: [
      {
        tag: "forge:stripped_wood",
      },
      {
        item: "minecraft:gold_ingot",
      },
    ],
    results: [
      {
        item: "kubejs:gold_casing",
      },
    ],
  });

  // JACK'S ECONOMY
  // craft basic wallet
  event.shaped(Item.of("jackseconomy:basic_wallet"), ["LL", "SS"], {
    L: "minecraft:leather",
    S: "minecraft:string",
  });
  // craft intermediate wallet
  event.smithing(
    "jackseconomy:intermediate_wallet",
    "minecraft:string",
    "jackseconomy:basic_wallet",
    "minecraft:gold_block"
  );
  // craft advanced wallet
  event.smithing(
    "jackseconomy:advanced_wallet",
    "minecraft:string",
    "jackseconomy:intermediate_wallet",
    "minecraft:diamond_block"
  );
  // craft the phat wallet
  event.smithing(
    "jackseconomy:the_phat_wallet",
    "minecraft:string",
    "jackseconomy:advanced_wallet",
    "minecraft:netherite_block"
  );

  // blocks
  // craft the money counter
  event.shaped(Item.of("kubejs:money_counter"), ["AGR", "PCI", "AHR"], {
    A: "computercraft:cable",
    P: "minecraft:piston",
    G: "kubejs:gold_casing",
    R: "minecraft:redstone",
    C: "minecraft:chest",
    H: "minecraft:hopper",
    I: "kubejs:computer_chip",
  });

  // craft mechanical importer
  event.shaped(
    Item.of("jackseconomy:mechanical_importer"),
    ["HMH", "ECE", "RSR"],
    {
      H: "minecraft:hopper",
      M: "computercraft:wireless_modem_advanced",
      E: "minecraft:ender_pearl",
      C: "kubejs:money_counter",
      R: "minecraft:redstone",
      S: "create:shaft",
    }
  );

  // craft mechanical exporter
  event.shaped(
    Item.of("jackseconomy:mechanical_exporter"),
    ["HMH", "ECE", "RSR"],
    {
      H: "minecraft:hopper",
      M: "computercraft:wireless_modem_advanced",
      E: "minecraft:ender_eye",
      C: "kubejs:money_counter",
      R: "minecraft:redstone",
      S: "create:shaft",
    }
  );

  // craft currency converter
  event.shapeless(Item.of("jackseconomy:currency_converter"), [
    "kubejs:gold_casing",
    "jackseconomy:intermediate_wallet",
  ]);
});
