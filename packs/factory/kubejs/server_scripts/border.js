const LEVEL_AREA = 0.5;
const MAX_BORDER = 4000;
const EXPAND_SOUND = "kubejs:expandborder"
const DROP_SOUND = "kubejs:dropborder"

function sideOfArea(a) {
    return Math.sqrt(a * 1000000);
}
function areaOfSide(s) {
    return Math.pow(s / 1000, 2);
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal('worldborderexpand') // name of the command
        .requires(source => source.hasPermission(2)) // operator privileges
        .executes(ctx => {
            try {
                var wb = ctx.source.getLevel().worldBorder;

                var setSize = function (n) {
                    wb.setSize(n);
                    var server = ctx.source.getServer();
                    var drop = n >= 60000000
                    server.tell(
                        !drop ? Component.join(
                            Component.lightPurple("Граница мира расширена! Новые размеры: "),
                            Component.green(`${Math.floor(n)} на ${Math.floor(n)} блоков (${Math.floor(areaOfSide(n) * 2) / 2} км²)`)
                        ) : Component.lightPurple("Граница мира УПАЛА!"),
                    )
                    server.runCommandSilent(
                        `execute as @a at @s run playsound ${drop ? DROP_SOUND : EXPAND_SOUND} master @s ~ ~ ~ 1 1`
                    )
                }

                var area = areaOfSide(wb.getSize());
                var newSize = sideOfArea(area + LEVEL_AREA);
                if (newSize >= MAX_BORDER) {
                    setSize(60000000);
                } else {
                    setSize(newSize);
                }
                // wb.lerpSizeBetween(area, sideOfArea(newArea), 10000);
            } catch (e) {
                return e;
            }
            return 0;
        })
    )
})

ServerEvents.loaded(event => {
})

PlayerEvents.loggedIn(event => {
    const server = event.server
    const data = server.persistentData

    if (data.getBoolean("dropborder_initialized")) {
        return
    }

    const size = sideOfArea(LEVEL_AREA)

    server.runCommandSilent(`worldborder set ${size}`)
    data.putBoolean("dropborder_initialized", true)

    console.log(`[DropBorder] Initial world border set to ${size}`)
})

ItemEvents.rightClicked('kubejs:experience_singularity', event => {
    const { player, server, item } = event
    if (player.level.clientSide) return

    server.runCommandSilent('worldborderexpand')

    item.count = 0
})