import { ImageSourcePropType, View, Image, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

type Props = {
    name: string;
    image: ImageSourcePropType;
}

const Restaurant = ({ name, image }: Props) => {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const imageWidth = width * 0.9; 
    const horizontalMargin = width * 0.05; 
    
    return (
        <Pressable 
            onPress={() => router.push("/user/booking/selectTable")}
            style={[styles.container, { marginHorizontal: horizontalMargin }]}
        >
            <View style={[styles.imageContainer, { 
                width: imageWidth, 
                height: imageWidth * 0.4 
            }]}>
                <Image 
                    source={image} 
                    style={styles.image} 
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 16,
        borderRadius: 12, 
        overflow: 'hidden', 
    },
    imageContainer: {
        
    },
    image: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 16,
        color: '#333',
        textAlign: 'center',
        backgroundColor: 'white',
    },
});

export default Restaurant;