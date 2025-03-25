import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
import { Img } from "./images";

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Hello Renzo!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite events found.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.event_date_id.toString()}
          renderItem={({ item }) => (
            <EventItem item={item} favoritePress={() => dispatch(toggleFavorite(item))} />
          )}
        />
      )}
    </View>
  );
};

// Event Item Component
const EventItem = ({ item, favoritePress }) => {
  return (
    <View style={styles.itemView}>
      <Image source={{ uri: item.event_profile_img }} style={styles.event_img} />
      <View style={{ flex: 1 }}>
        <Text style={styles.eventName}>{item.event_name}</Text>
        <Text style={styles.eventDate}>
          {item.readable_from_date}  {item.readable_to_date ? "- "+ item.readable_to_date:""}
        </Text>
        <Text style={styles.eventPrice}>
          €{item.event_price_from} {item.event_price_to? "- €" + item.event_price_to:""}
        </Text>
      </View>
      <TouchableOpacity onPress={favoritePress}>
        <Image style={styles.icon} source={Img.heartFill} />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F2F2F2",
  },
  topView: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
  },
  itemView: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 1,
  },
  event_img: {
    width: 65,
    height: 65,
    borderRadius: 5,
    marginRight: 10,
  },
  eventName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#34A853",
  },
  eventPrice: {
    color: "#555",
  },
  icon: {
    height: 22,
    width: 22,
  },
};

export default FavoritesScreen;
