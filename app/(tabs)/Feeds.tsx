import { View, Text, FlatList, ScrollView } from "react-native";
import data from "@/app/data/feed.json";
import { Image } from "react-native";
const Page = () => {
  const feeds = ({ item }: { item: FeedProps }) => (
    <FeedComponent key={item.id} {...item} />
  );
  return (
    <FlatList
      data={data}
      renderItem={feeds}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={<Text>Footer after list</Text>}
    />
  );
};

type FeedProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  fullText: string;
  retweetCount: number;
  replyCount: number;
  favoriteCount: number;
};

const FeedComponent = (props: FeedProps) => {
  return (
    <View className="flex flex-row  p-4 border-b border-gray-300">
      <Image
        source={require("../../assets/images/bluebird.png")}
        style={{ width: 40, height: 40 }}
      />

      <View className="flex    ">
        <Text className="font-semibold text-lg">{props.author.name}</Text>

        <Text numberOfLines={3} ellipsizeMode="tail" className="break-all">
          {props.fullText}
        </Text>

        <View className="flex-row space-x-6">
          <Text className="text-gray-500">💬 {props.replyCount}</Text>
          <Text className="text-gray-500">🔁 {props.retweetCount}</Text>
          <Text className="text-gray-500">❤️ {props.favoriteCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default Page;
