const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}

// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
  const files = fs.readdirSync(path.join(__dirname, '../data/'));

  files.forEach((file) => {
    if (file.startsWith("map")) {
      resp.obstacles.push(file);
    } else if (file.startsWith("robot")) {
      resp.robots.push(file);
    }
  });
  
  return resp;
}

const elementsData = getMapData();
fs.writeFileSync(
  path.join(staticDataDir, 'elements.json'),
  JSON.stringify(elementsData, null, 2)
);
console.log('Generated elements.json');

// Generate data files for each robot and obstacle
function processDataFile(filePath) {
  const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
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
    });
  });
  return resp;
}

// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
elementsData.robots.forEach(robotFile => {
  const processedData = processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${robotFile}.json`);
});

elementsData.obstacles.forEach(obstacleFile => {
  const processedData = processDataFile(path.join(dataDir, obstacleFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${obstacleFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${obstacleFile}.json`);
});

console.log('Static data generation complete!');