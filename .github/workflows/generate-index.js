const fs = require('node:fs/promises');

const ignore = ['index.json', '.github', '.git'];

const ezTomlParse = (toml, key) => {
    try {
        const path = key.split('.');
        if (path.length > 1) {
            toml = toml.split(`[${path[0]}]`)[1];
            return ezTomlParse(toml, path[1]);
        }
        const pairs = toml.split('\n').map((line) => line.split('=').map(t => t.trim()));
        const val = pairs.filter((pair) => pair[0] === path[0])[0][1];
        return eval(val);
    } catch (e) {
        return null;
    }
}

const generateIndex = async () => {
    const files = await fs.readdir('./');
    const index = await Promise.all(files
        .filter((dir) => !ignore.includes(dir))
        .map(async (dir) => {
            const toml = await fs.readFile(`${dir}/pack.toml`, 'utf8');

            let icon = (await fs.stat(`${dir}/pack.png`).then(() => `${dir}/pack.png`).catch(() => null));
            if (!icon) icon = (await fs.stat(`${dir}/pack.jpg`).then(() => `${dir}/pack.jpg`).catch(() => null));

            if (!ezTomlParse(toml, 'name')) return null;
            const obj = {
                name: ezTomlParse(toml, 'name'),
                author: ezTomlParse(toml, 'author'),
                id: dir,
                icon,
                versions: {
                    pack: ezTomlParse(toml, 'version'),
                    pw: ezTomlParse(toml, 'pack-format'),
                    mc: ezTomlParse(toml, 'versions.minecraft'),
                    forge: ezTomlParse(toml, 'versions.forge'),
                },
                modCount: (await fs.readdir(`${dir}/mods`)).length,
            }

            console.log("Generated index for", obj.name, "@" + obj.versions.pack);
            return obj;
        })
    )

    await fs.writeFile('index.json', JSON.stringify(index.filter(pack => pack !== null), undefined, 2));
}

generateIndex();