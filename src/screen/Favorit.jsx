///bataaaaaaaaaas

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, { interpolate } from "react-native-reanimated";

const SwipeableItem = ({ text, imageSource, onDelete }) => {
  const renderRightActions = (_, dragX) => {
    return (
      <RectButton onPress={onDelete} style={styles.deleteButton}>
        <Animated.Text>Delete</Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <Image
          source={{
            uri: imageSource,
          }}
          style={styles.image}
        />
      </View>
    </Swipeable>
  );
};

export default function Favorit() {
  const [data, setData] = useState([]);
  const url = "https://b7b8-116-206-14-36.ngrok-free.app/Favorites";

  const getDataFav = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  };

  useEffect(() => {
    getDataFav();
  }, []);

  const handleDelete = (id) => {
    // Logic for deleting item
    console.log("Item deleted!", id);
  };

  return (
    <View>
      <Button
        title="refresh"
        onPress={() => {
          getDataFav();
        }}
      />
      <FlatList
        data={data}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <SwipeableItem
            text="Swipe me"
            imageSource={item.image}
            onDelete={() => handleDelete(item.image)}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 200,
    width: 200,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure the image does not overflow
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "white",
  },
});
