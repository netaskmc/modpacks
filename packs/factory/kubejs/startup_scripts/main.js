// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded startup example script)')

StartupEvents.registry('fluid', event => {
    const polymer = event.create('polymer')
        .displayName('Polymer')
        .stillTexture('kubejs:block/polymer_still')
        .flowingTexture('kubejs:block/polymer_flow')

    polymer.bucketItem.texture("kubejs:item/polymer_bucket")
})

StartupEvents.registry('item', event => {
    event.create('plastic')
    event.create('experience_core').rarity("rare")
    event.create('experience_singularity').maxStackSize(1).glow(true).rarity("epic")
})