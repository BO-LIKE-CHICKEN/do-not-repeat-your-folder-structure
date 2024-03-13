export function generateComponentTemplate(folderName: string) {
  return `import React from 'react';

type Props = {};

const ${folderName} = (props: Props) => {
return <div>${folderName}</div>;
};

export default ${folderName};
`;
}

export function generateIndexTemplate(folderName: string) {
  return `import ${folderName} from './${folderName}';

export default ${folderName};
`;
}
