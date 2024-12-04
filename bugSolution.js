// bugSolution.js
import { Camera, FlashMode } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

//Improved Camera usage
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera style={styles.camera} type={type} flashMode={FlashMode.off}>
      {/* ... your camera components ... */}
    </Camera>
  );
}

//Improved BarCodeScanner usage
export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      // Handle scan data
      console.log(`Type: ${type}, Data: ${data}`);
    };
  
if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}