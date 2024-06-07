import Share from 'react-native-share';
import LogFile from '../logs'; // Certifique-se de ajustar o caminho para o seu módulo de log
import RNFS from 'react-native-fs';
const handleShareLogs = async () => {
  try {
    const encryptedLogFilePath = await LogFile.encryptLogFile();

    // Verifica se o arquivo existe
    const fileExists = await RNFS.exists(encryptedLogFilePath);
    if (!fileExists) {
      console.error(
        `Error: Log file does not exist at path: ${encryptedLogFilePath}`
      );
      return;
    }

    const options = {
      type: 'application/octet-stream',
      url: `file://${encryptedLogFilePath}`,
    };

    // Tente compartilhar o arquivo
    await Share.open(options);
  } catch (error) {
    console.error(`\x1b[31mError sharing log file: ${error}\x1b[0m`);
  }
};

export default handleShareLogs;
