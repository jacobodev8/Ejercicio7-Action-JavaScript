const core = require('@actions/core');
const fs = require('fs');

async function run() {
  try {
    const user = core.getInput('user');
    const urlMirror = core.getInput('url_mirror');
    const password = core.getInput('password');

    const xml = `
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0">
  <servers>
    <server>
      <id>server001</id>
      <username>${user}</username>
      <password>${password}</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>planetmirror.com</id>
      <name>mirror Spain</name>
      <url>${urlMirror}</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
</settings>
`;

    fs.writeFileSync('settings.xml', xml.trim());
    core.info("Archivo settings.xml generado correctamente.");

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
