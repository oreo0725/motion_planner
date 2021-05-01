import fs from 'fs';

export function getMapData() {
    var resp = {
        robots: [],
        obstacles: [],
    }
    var files = fs.readdirSync('data/');

    files.forEach((path, i) => {
        if (path.startsWith("map")) {
            resp.obstacles.push(path);
        } else {
            resp.robots.push(path);
        }
    })
    return resp;
}

export function read(path) {
    const data = fs.readFileSync("data/" + path, { encoding: 'utf8', flag: 'r' });
    let lines = data.split("\n");
    let resp = '';
    lines.forEach((l) => {
        if (l.startsWith('#') || l === '') {
            return;
        }
        let nodes = l.split(" ");
        nodes.forEach((n) => {
            if (n === '') {
                return;
            }
            resp += n + "\t";
        })
    })
    return resp;
}