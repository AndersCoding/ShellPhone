import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Ninja Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Ninja Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
      name="map"
      options={{
        title: "Ninja Map",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="map" color={color} size={size} />
        ),
      }}
    />
    </Tabs>
  );
}
