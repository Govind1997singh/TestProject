import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchEvents } from "../api/apiService";
import {
  loadFavoritesFromStorage,
  saveFavoritesToStorage,
  toggleFavorite,
} from "../redux/slices/favoritesSlice";
import { Img } from "./images";

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  // Load Events from API
  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data?.data?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Favorite Event
  const handleToggleFavorite = (item) => {
    dispatch(toggleFavorite(item));
    saveFavoritesToStorage(
      favorites ? [...favorites, item] : [item]
    );
  };

  // Reload Data When Switching Tabs
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.topView}>
            <Text style={styles.title}>Hello Renzo!</Text>
            <Text style={styles.subtitle}>Are you ready to dance?</Text>
          </View>
          <FlatList
            data={events}
            keyExtractor={(item) => item.event_date_id.toString()}
            renderItem={({ item }) => (
              <EventItem item={item} favoritePress={handleToggleFavorite} />
            )}
          />
        </View>
      )}
    </View>
  );
};

// Event Item Component
const EventItem = ({ item, favoritePress }) => {
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites?.some(
    (fav) => fav.event_date_id === item.event_date_id
  );

  return (
    <View style={styles.itemView}>
      <Image source={{ uri: item.event_profile_img }} style={styles.event_img} />

      <View style={{ flex: 1 }}>
        <Text style={styles.eventName}>{item?.event_name}</Text>
        <Text style={styles.eventDate}>
          {item?.readable_from_date}{" "}
          {item?.readable_to_date ? `- ${item.readable_to_date}` : ""}
        </Text>
        <Text style={styles.eventPrice}>
          €{item?.event_price_from}{" "}
          {item?.event_price_to ? `- €${item.event_price_to}` : ""}
        </Text>

        {/* Event Keywords */}
        <View style={styles.row}>
          {item?.keywords?.map((key, index) => (
            <View key={index} style={styles.keywordView}>
              <Text style={styles.keywordText}>{key}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Actions: Navigate, Share, Favorite */}
      <View style={styles.rightView}>
        <TouchableOpacity>
          <Image style={styles.icon} source={Img.right} />
        </TouchableOpacity>
        <Text style={styles.location}>
          {item?.city}, {item?.country}
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.iconButton}>
            <Image style={styles.icon} source={Img.share} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => favoritePress(item)}>
            <Image
              style={styles.icon}
              source={isFavorite ? Img.heartFill : Img.heart}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    height: "100%",
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
  row: {
    flexDirection: "row",
  },
  keywordView: {
    backgroundColor: "#F5F7FC",
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 5,
  },
  keywordText: {
    color: "#181A1F",
  },
  rightView: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    top: 5,
    bottom: 5,
    right: 5,
  },
  location: {
    color: "gray",
    fontSize: 11,
  },
  icon: {
    height: 22,
    width: 22,
  },
  iconButton: {
    marginRight: 10,
  },
};

export default EventListScreen;
