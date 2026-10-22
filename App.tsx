import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions,StyleSheet, Text, TouchableOpacity,  View,} from "react-native";

export default function App() {

  const {width} = Dimensions.get("window");

  const cores =[
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


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
         <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {cores.map((cor) => (
          <TouchableOpacity
            key={cor}
            style={{
              width: width / 6,
              height: width / 6,
              backgroundColor: cor,
            }}
          />
        ))}
      </View>
    </View>
  );
}
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