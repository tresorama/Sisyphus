const fs = require('fs');
const path = require('path');

// ===============================================
// Import Sisyphus Contract - Artifact + Address
// ===============================================
// import as .json file
fs.copyFileSync(
  path.join(__dirname, "../../chain/artifacts/contracts/Sisyphus.sol/Sisyphus.json"),
  path.join(__dirname, "../src/assets/contracts/Sisyphus.artifact.json"),
);
// import as .ts file, with const assertion
(() => {
  const artifactJson = fs.readFileSync(path.join(__dirname, "../../chain/artifacts/contracts/Sisyphus.sol/Sisyphus.json"));
  const artifactTs = `export default ${String(artifactJson).trim()} as const;`;
  fs.writeFileSync(
    path.join(__dirname, "../src/assets/contracts/Sisyphus.artifact.ts"),
    artifactTs
  );
})();
// import address as .json
fs.copyFileSync(
  path.join(__dirname, "../../chain/address.json"),
  path.join(__dirname, "../src/assets/contracts/Sisyphus.address.json"),
);
