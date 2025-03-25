import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchEvents } from '../api/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        console.log(data)
        setEvents(data.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#F2F2F2" }}>
      {loading ? <ActivityIndicator size="large" /> : (
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Hello Renzo!</Text>
          <Text style={{ color: "gray" }}>Are you ready to dance?</Text>
          <FlatList data={events} keyExtractor={(item) => item.id} renderItem={({ item }) => <EventItem item={item} />} />

        </View>
      )}
      <TouchableOpacity style={styles.favoriteBtn} onPress={() => navigation.navigate('Favorites')}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>View Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const EventItem = ({ item }) => (
  <View style={styles.itemView}>
    <Image source={{ uri: item.event_profile_img }} style={styles.event_img} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.event_name}</Text>
      <Text style={{ color: "#34A853" }}>{item?.readable_from_date} {item?.readable_to_date == "" ? "" : " - " + item.readable_to_date}</Text>
      <Text style={{ color: "#555" }}>€ {item?.event_price_from} {item?.event_price_to == "" ? "" : " - €" + item.event_price_to}</Text>
      <View style={styles.row}>
        {item?.keywords && item?.keywords.length > 0 && item.keywords.map((key) =>
          <View style={styles.keywordView}>
            <Text style={{ color: "#181A1F" }}>{key}</Text>

          </View>
        )}
      </View>

    </View>
    <View>
    <Text style={{ color: "gray", fontSize:11 }}>{item?.city}, {item?.country}</Text>
    <TouchableOpacity>
      {/* <Heart size={20} color="gray" /> */}
    </TouchableOpacity>
    <TouchableOpacity>
      {/* <ArrowRight size={20} color="gray" style={{ marginLeft: 10 }} /> */}
    </TouchableOpacity>
  
    </View>
   </View>
);

const styles = {
  itemView: {
    flexDirection: "row",
    backgroundColor: '#fff',
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 1
  },
  event_img: {
    width: 60,
    height: "90%",
    borderRadius: 5,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',

  },
  favoriteBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10
  },
  keywordView: {
    backgroundColor: "#F5F7FC",
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 5,

  }
}
export default EventListScreen;
