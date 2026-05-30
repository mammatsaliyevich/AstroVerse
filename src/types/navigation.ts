import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Universe: undefined;
  ObjectDetail: { planetId: string };
  Surface: { objectId: string };
  AIGuide: { planetId?: string };
  Achievements: undefined;
};

export type NavProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type Route<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
