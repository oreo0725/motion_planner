const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}

// Generate elements.json
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}

// Define constants for file prefixes
const MAP_PREFIX = 'map';
const ROBOT_PREFIX = 'robot';

// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
      if (file.startsWith(MAP_PREFIX)) {
        resp.obstacles.push(file);
      } else if (file.startsWith(ROBOT_PREFIX)) {
        resp.robots.push(file);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error; // Rethrow the error after logging
  }
  
  return resp;
}
  const resp = {
    robots: [],
    obstacles: [],
  };
  try {
  const resp = {
    robots: [],
    obstacles: [],
  };
robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
      if (file.startsWith(MAP_PREFIX)) {
        resp.obstacles.push(file);
      } else if (file.startsWith(ROBOT_PREFIX)) {
        resp.robots.push(file);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  
  return resp;
}

// Create directory if it doesn't exist
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}
        resp.obstacles.push(file);
      } else if (file.startsWith("robot")) {
        resp.robots.push(file);
      }
    });
// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
      if (file.startsWith("map")) {
        resp.obstacles.push(file);
      } else if (file.startsWith("robot")) {
        resp.robots.push(file);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error; // Rethrow the error after logging
  }
  
  return resp;
}

// Create directory if it doesn't exist
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}

// Define constants for file prefixes
const MAP_PREFIX = 'map';
    console.error('Error reading directory:', error);
  }
  
  return resp;
}

  files.forEach((file) => {
}
  
  return resp;
}

// Define constants for file prefixes
const staticDataDir = path.join(__dirname, '../dist/static-data');
if (!fs.existsSync(staticDataDir)) {
  fs.mkdirSync(staticDataDir, { recursive: true });
}

// Define constants for file prefixes
const MAP_PREFIX = 'map';
const ROBOT_PREFIX = 'robot';

// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
      if (file.startsWith(MAP_PREFIX)) {
        resp.obstacles.push(file);
      } else if (file.startsWith(ROBOT_PREFIX)) {
        resp.robots.push(file);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  
  return resp;
}

  files.forEach((file) => {
    if (file.startsWith(MAP_PREFIX)) {
      resp.obstacles.push(file);
    } else if (file.startsWith(ROBOT_PREFIX)) {
      resp.robots.push(file);
    }
  });
  
  return resp;
}
// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
return resp;
}

// Generate elements.json
function getMapData() {
  const resp = {
    robots: [],
    obstacles: [],
  };
  try {
    const files = fs.readdirSync(path.join(__dirname, '../data/'));

    files.forEach((file) => {
      if (file.startsWith(MAP_PREFIX)) {
        resp.obstacles.push(file);
      } else if (file.startsWith(ROBOT_PREFIX)) {
        resp.robots.push(file);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  
  return resp;
}

  files.forEach((file) => {
    if (file.startsWith(MAP_PREFIX)) {
      resp.obstacles.push(file);
    } else if (file.startsWith(ROBOT_PREFIX)) {
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
}

const elementsData = getMapData();
fs.writeFileSync(
  path.join(staticDataDir, 'elements.json'),
  JSON.stringify(elementsData, null, 2)
);
console.log('Generated elements.json');
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
);
console.log('Generated elements.json');
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
async function processDataFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    let lines = data.split("
");
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
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    throw error;
  }
}

// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
elementsData.robots.forEach(async (robotFile) => {
  try {
    const processedData = await processDataFile(path.join(dataDir, robotFile));
    fs.writeFileSync(
      path.join(staticDataDir, `${robotFile}.json`),
      JSON.stringify({ data: processedData }, null, 2)
    );
    console.log(`Generated ${robotFile}.json`);
  } catch (error) {
    console.error(`Error processing robot file ${robotFile}:`, error);
  }
});
  const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
  let lines = data.split("
");
  let resp = '';
// Generate data files for each robot and obstacle
}

const elementsData = getMapData();
fs.writeFileSync(
  path.join(staticDataDir, 'elements.json'),
  JSON.stringify(elementsData, null, 2)
);
console.log('Generated elements.json');

// Generate data files for each robot and obstacle
const elementsData = getMapData();
fs.writeFileSync(
  path.join(staticDataDir, 'elements.json'),
  JSON.stringify(elementsData, null, 2)
);
console.log('Generated elements.json');

// Generate data files for each robot and obstacle
async function processDataFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    let lines = data.split("
");
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
  } catch (error) {
// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

async function processDataFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    let lines = data.split("
");
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
  } catch (error) {
    console.error(`Error processing file ${encodeURIComponent(filePath)}:`, error);
    throw error;
  }
}
    throw error;
  }
}

// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
async function processAllFiles() {
  try {
    for (const robotFile of elementsData.robots) {
      try {
        const processedData = await processDataFile(path.join(dataDir, robotFile));
        fs.writeFileSync(
          path.join(staticDataDir, `${robotFile}.json`),
          JSON.stringify({ data: processedData }, null, 2)
        );
        console.log(`Generated ${robotFile}.json`);
      } catch (error) {
        console.error(`Error processing robot file ${robotFile}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing robot files:', error);
  }
}

processAllFiles();

// Generate data files for each robot and obstacle
async function processDataFile(filePath) {
  const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
  let lines = data.split("
");
  let resp = '';
  lines.forEach((line) => {
    if (line.startsWith('#') || line === '') {
  try {
    const processedData = await processDataFile(path.join(dataDir, robotFile));
    fs.writeFileSync(
      path.join(staticDataDir, `${robotFile}.json`),
      JSON.stringify({ data: processedData }, null, 2)
    );
// Import DOMPurify for sanitizing user input
  // const DOMPurify = require('dompurify');

  try {
    const processedData = await processDataFile(path.join(dataDir, robotFile));
    fs.writeFileSync(
      path.join(staticDataDir, `${robotFile}.json`),
      JSON.stringify({ data: processedData }, null, 2)
    );
    console.log(`Generated ${DOMPurify.sanitize(robotFile)}.json`);
  } catch (error) {
    console.error(`Error processing robot file ${DOMPurify.sanitize(robotFile)}:`, error);
  }
  } catch (error) {
// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

try {
  const processedData = await processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${robotFile}.json`);
} catch (error) {
  console.error(`Error processing robot file ${DOMPurify.sanitize(robotFile)}:`, error);
}
  }
});
  const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
  let lines = data.split("
");
  let resp = '';
// Generate data files for each robot and obstacle
async function processDataFile(filePath) {
  const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
  let lines = data.split("
");
  let resp = '';
  lines.forEach((line) => {
    if (line.startsWith('#') || line === '') {
      return;
    }
    let nodes = line.split(" ");
    nodes.forEach((node) => {
      if (node === '') {
        return;
      }
      resp += node + "\t";
    });
  });
  return resp;
}

// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
Promise.all(elementsData.robots.map(async (robotFile) => {
  try {
    const processedData = await processDataFile(path.join(dataDir, robotFile));
    fs.writeFileSync(
      path.join(staticDataDir, `${robotFile}.json`),
      JSON.stringify({ data: processedData }, null, 2)
    );
    console.log(`Generated ${robotFile}.json`);
  } catch (error) {
    console.error(`Error processing robot file ${robotFile}:`, error);
  }
})).then(() => {
  console.log('All robot files processed');
}).catch((error) => {
  console.error('Error processing robot files:', error);
});

// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

Promise.all(elementsData.robots.map(async (robotFile) => {
  try {
    const processedData = await processDataFile(path.join(dataDir, robotFile));
    fs.writeFileSync(
      path.join(staticDataDir, `${robotFile}.json`),
      JSON.stringify({ data: processedData }, null, 2)
    );
    console.log(`Generated ${robotFile}.json`);
  } catch (error) {
    console.error(`Error processing robot file ${robotFile}:`, error);
  }
}));
  let lines = data.split("
");
  let resp = '';
  lines.forEach((line) => {
    if (line.startsWith('#') || line === '') {
      return;
    }
    let nodes = line.split(" ");
    nodes.forEach((node) => {
      if (node === '') {
        return;
      }
      resp += node + "\t";
    });
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
elementsData.robots.forEach(async (robotFile) => {
}

// Process all robot and obstacle files
const dataDir = path.join(__dirname, '../data');
elementsData.robots.forEach(async (robotFile) => {
  const processedData = await processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
// Import DOMPurify for sanitizing user input
// DOMPurify is a library that helps prevent XSS attacks by sanitizing HTML and preventing script injection
import DOMPurify from 'dompurify';

elementsData.robots.forEach(async (robotFile) => {
  const processedData = await processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${DOMPurify.sanitize(robotFile)}.json`);
});
});

// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

elementsData.robots.forEach(robotFile => {
  const processedData = processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
// Import DOMPurify for sanitizing user input
// DOMPurify is a library that helps prevent XSS attacks by sanitizing HTML and preventing script injection
import DOMPurify from 'dompurify';

elementsData.robots.forEach(robotFile => {
  const processedData = processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${DOMPurify.sanitize(robotFile)}.json`);
  let resp = '';
  lines.forEach((l) => {
    if (l.startsWith('#') || l === '') {
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
// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

elementsData.robots.forEach(robotFile => {
  const processedData = processDataFile(path.join(dataDir, robotFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${robotFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${DOMPurify.sanitize(robotFile)}.json`);
});
});

elementsData.obstacles.forEach(obstacleFile => {
  const processedData = processDataFile(path.join(dataDir, obstacleFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${obstacleFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
// Import the DOMPurify library for sanitizing user input
// const DOMPurify = require('dompurify');

elementsData.obstacles.forEach(obstacleFile => {
  const processedData = processDataFile(path.join(dataDir, obstacleFile));
  fs.writeFileSync(
    path.join(staticDataDir, `${obstacleFile}.json`),
    JSON.stringify({ data: processedData }, null, 2)
  );
  console.log(`Generated ${DOMPurify.sanitize(obstacleFile)}.json`);
});
});

console.log('Static data generation complete!');