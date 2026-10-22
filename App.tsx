import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Alert,  Button,Dimensions,  StyleSheet,Text,TouchableOpacity,View,} from "react-native";
import { captureRef } from "react-native-view-shot";

export default function App() {
  const { width } = Dimensions.get("window");

  const cores = [
    "#FFFFFF",
    "#FFE135",
    "#FF8C00",
    "#E32636",
    "#FF69B4",
    "#8A2BE2",
    "#1F3FBF",
    "#4FB3E8",
    "#1E8B3A",
    "#7FD13B",
    "#813f10",
    "#000000",
  ];

  const [corAtual, setCorAtual] = useState("#000000");
  const [pixels, setPixels] = useState(Array(64).fill("#000000"));

  const gradeRef = useRef<View>(null);

  function limpar() {
    setPixels(Array(64).fill("#000000"));
  }

  function pixelar(index: number) {
    const novosPixels = [...pixels];
    novosPixels[index] = corAtual;
    setPixels(novosPixels);
  }

  async function compartilhar() {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Ops", "Compartilhamento não disponível neste dispositivo.");
      return;
    }

    try {
      const uri = await captureRef(gradeRef, { format: "png", quality: 1 });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar desenho",
        UTI: "public.png",
      });
    } catch (erro) {
      Alert.alert("Ops", "Não foi possível compartilhar o desenho.");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 40 }}>
        {cores.map((cor) => (
          <TouchableOpacity
            key={cor}
            style={{
              width: width / 6,
              height: width / 6,
              backgroundColor: cor,
            }}
            onPress={() => setCorAtual(cor)}
          >
            <Text style={{ fontSize: 32, textAlign: "center" }}>
              {cor === corAtual ? "X" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
      <View
        ref={gradeRef}
        collapsable={false}
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#000",
          justifyContent: "center",
          width: width,
        }}
      >
        {pixels.map((p, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pixelar(index)}
            style={{
              width: width / 8 - 1,
              height: width / 8 - 1,
              backgroundColor: p,
              borderWidth: 1,
              borderColor: "white",
            }}
          />
        ))}
      </View>

      <View style={{ marginBottom: 40, flexDirection: "row", gap: 16 }}>
        <Button title="Limpar" onPress={limpar} />
        <Button title="Compartilhar" onPress={compartilhar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});