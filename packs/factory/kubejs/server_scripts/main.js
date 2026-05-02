ServerEvents.recipes(event => {
    // create diesel gene
    event.replaceInput(
        { mod: 'createdieselgenerators' },
        'create:iron_sheet',
        'create_ironworks:steel_sheet'
    )
    event.replaceInput(
        { mod: 'createdieselgenerators' },
        'minecraft:iron_ingot',
        'create_ironworks:steel_ingot'
    )

    event.forEachRecipe({ output: 'createdieselgenerators:engine_piston' }, recipe => {
        event.remove(recipe.getId())
    })

    event.shaped('createdieselgenerators:engine_piston', [
        'N  ',
        ' S ',
        '  A'
    ], {
        N: 'create_ironworks:steel_ingot',
        S: 'create:shaft',
        A: 'create:andesite_alloy',
    })

    event.replaceInput(
        { output: 'create_new_age:nuclear_fuel' },
        'create:iron_sheet',
        'create_ironworks:steel_sheet'
    )
    event.replaceInput(
        { output: 'create_new_age:reactor_casing' },
        'create:iron_sheet',
        'create_ironworks:steel_sheet'
    )


    // bodyabuilder's request
    event.shaped('minecraft:bedrock', [
        'BBB',
        'BBB',
        'BBB'
    ], {
        B: 'minecraft:bedrock',
    })

    // polymer
    event.remove({ id: "createdieselgenerators:distillation/crude_oil" })
    event.remove({ id: "createdieselgenerators:distillation/superheated_crude_oil" })
    event.custom({
        "type": "createdieselgenerators:distillation",
        "ingredients": [
            {
                "type": "fluid_tag",
                "fluid_tag": "c:crude_oil",
                "amount": 100
            }
        ],
        "heat_requirement": "superheated",
        "processing_time": 40,
        "results": [
            {
                "id": "createdieselgenerators:diesel",
                "amount": 75
            },
            {
                "id": "createdieselgenerators:gasoline",
                "amount": 75
            },
            {
                "id": "kubejs:polymer",
                "amount": 75
            },
        ]
    })

    // polymer to plastic
    event.custom({
        "type": "create:compacting",
        "heat_requirement": "heated",
        "ingredients": [
            {
                "type": "neoforge:single",
                "amount": 50,
                "fluid": "kubejs:polymer"
            }
        ],
        "results": [
            {
                "id": "kubejs:plastic"
            }
        ]
    })

    // plastic progression
    event.remove({ output: "create_new_age:basic_energiser" })
    event.shaped('create_new_age:basic_energiser', [
        'PAP',
        ' R ',
        '   '
    ], {
        P: 'kubejs:plastic',
        A: 'create:andesite_casing',
        R: 'minecraft:lightning_rod',
    });

    event.remove({ output: "create_new_age:electrical_connector" })
    event.shaped('create_new_age:electrical_connector', [
        'AC',
        'CP',
        'AC'
    ], {
        P: 'kubejs:plastic',
        A: 'create:andesite_alloy',
        C: 'create:copper_nugget',
    });
    event.shaped('create_new_age:electrical_connector', [
        'CA',
        'PC',
        'CA'
    ], {
        P: 'kubejs:plastic',
        A: 'create:andesite_alloy',
        C: 'create:copper_nugget',
    });

    event.remove({ output: "create_connected:kinetic_battery" })
    event.shaped(Item.of('create_connected:kinetic_battery', 8), [
        ' M ',
        ' C ',
        'PRP'
    ], {
        M: 'create:precision_mechanism',
        C: 'create:brass_casing',
        R: 'minecraft:redstone',
        P: 'kubejs:plastic',
    });

    // xp compacting

    // event.custom({
    //     "type": "create:compacting",
    //     "ingredients": [
    //         {
    //             "type": "neoforge:single",
    //             "amount": 27,
    //             "fluid": "create_enchantment_industry:experience"
    //         }
    //     ],
    //     "results": [
    //         {
    //             "id": "create:experience_block"
    //         }
    //     ]
    // })

    event.shaped('kubejs:experience_core', [
        'EEE',
        'EEE',
        'EEE'
    ], {
        E: "create:experience_block"
    })
    event.shaped('kubejs:experience_singularity', [
        'EEE',
        'EEE',
        'EEE'
    ], {
        E: "kubejs:experience_core"
    })
})