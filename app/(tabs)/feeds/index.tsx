import { View, Text, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../data/feed.json";
import { Image } from "react-native";

const Page = () => {
  const feeds = ({ item }: { item: FeedProps }) => (
    <FeedComponent key={item.id} {...item} />
  );
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <FlatList
          data={data}
          renderItem={feeds}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
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
    <View className="p-4 border-b border-gray-300">
      <View className="flex-row items-center space-x-3 mb-2">
        <Image
          source={{ uri: props.author.avatar }}
          className="w-10 h-10 rounded-full"
        />
        <Text className="font-semibold text-lg">{props.author.name}</Text>
      </View>
      <Text className="text-base mb-3">{props.fullText}</Text>
      <View className="flex-row space-x-6">
        <Text className="text-gray-500">💬 {props.replyCount}</Text>
        <Text className="text-gray-500">🔁 {props.retweetCount}</Text>
        <Text className="text-gray-500">❤️ {props.favoriteCount}</Text>
      </View>
    </View>
  );
};

export default Page;
