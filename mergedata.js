const fs = require('fs');

let data = [];
let files = fs.readdirSync('./data');
for (let filename of files) {
    console.log(`reading data/${filename}`);
    let modData = JSON.parse(fs.readFileSync(`./data/${filename}`));
    let modName, modId;
    if (modData.hasOwnProperty('mod')) {
        modName = modData.mod.name;
        modId = filename.replace('.json', '');
        modData.mod.id = modId;
    }
    for (let i in modData) {
        if (!data.hasOwnProperty(i))
            data[i] = [];
        if (Array.isArray(modData[i]))
            for (let j of modData[i]) {
                j.mod = modName;
                j.modId = modId;
                j.itemType = i;
                if (j.itemType.endsWith('s'))
                    j.itemType = j.itemType.slice(0, -1);
                data.push(j);
            }
        else {
            modData[i].itemType = i;
            data.push(modData[i]);
        }
    }
}

console.log('\nwriting fulldata.json');
fs.writeFileSync('./fulldata.json', JSON.stringify(data));
console.log('done!');