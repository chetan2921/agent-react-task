import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Camera, DollarSign, FileText, ImagePlus, Info, Send, SlidersHorizontal, Tag, Calendar } from 'lucide-react-native';

import { AppButton } from '@/components/AppButton';
import { AppImage } from '@/components/AppImage';
import { AppInput } from '@/components/AppInput';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { sneakerPhotos } from '@/data/mockData';
import { useCreatePost } from '@/hooks/useAppData';
import { colors, radius, spacing } from '@/theme';

export default function CreatePostScreen() {
  const createPost = useCreatePost();
  const [imageUri, setImageUri] = useState('');
  const [brandName, setBrandName] = useState('Nike');
  const [sneakerName, setSneakerName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseAddress, setPurchaseAddress] = useState('');
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submit = async () => {
    setError('');
    if (!brandName.trim() || !sneakerName.trim() || !description.trim()) {
      setError('Brand, sneaker name, and description are required.');
      return;
    }

    try {
      await createPost.mutateAsync({
        brandName: brandName.trim(),
        sneakerName: sneakerName.trim(),
        description: description.trim(),
        purchaseAddress: purchaseAddress.trim() || undefined,
        price: price.trim() ? Number(price) : undefined,
        mainImage: imageUri || sneakerPhotos.collection,
      });
      setImageUri('');
      setSneakerName('');
      setDescription('');
      setPrice('');
      setPurchaseAddress('');
      router.replace('/feed');
    } catch (err) {
      Alert.alert('Post failed', err instanceof Error ? err.message : 'Could not create post.');
    }
  };

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText variant="title" accent style={styles.title}>Create Post</AppText>
          <AppText muted>Build a clean sneaker story before publishing.</AppText>
        </View>
        <AppButton onPress={submit} loading={createPost.isPending} style={styles.postButton}>
          <View style={styles.postLabel}>
            <AppText style={styles.postText}>Post</AppText>
            <Send color={colors.primary} size={20} fill={colors.primary} />
          </View>
        </AppButton>
      </View>
      <View style={styles.card}>
        <View style={styles.sectionTitle}>
          <View style={styles.sectionIcon}>
            <Camera color={colors.accent} size={25} />
          </View>
          <AppText variant="heading">Main Photo</AppText>
          <View style={styles.requiredBadge}>
            <AppText variant="caption" style={styles.requiredText}>REQUIRED</AppText>
          </View>
        </View>
        <Pressable onPress={pickImage} style={styles.uploadBox}>
          {imageUri ? (
            <AppImage uri={imageUri} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={styles.uploadContent}>
              <View style={styles.uploadIcon}>
                <ImagePlus color={colors.accent} size={44} />
              </View>
              <AppText variant="subheading" muted>Tap to add your fire pic</AppText>
              <AppText muted>Show off those kicks!</AppText>
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.card}>
        <View style={styles.sectionTitle}>
          <View style={[styles.sectionIcon, styles.blueIcon]}>
            <Info color={colors.primary} size={25} />
          </View>
          <AppText variant="heading">Sneaker Details</AppText>
        </View>
        <View style={styles.fieldWrap}>
          <View style={styles.fieldIcon}>
            <Tag color={colors.accent} size={24} />
          </View>
          <AppInput value={brandName} onChangeText={setBrandName} placeholder="Brand Name" style={styles.fieldInput} />
        </View>
        <View style={styles.fieldWrap}>
          <View style={styles.fieldIcon}>
            <View style={styles.ballIcon} />
          </View>
          <AppInput value={sneakerName} onChangeText={setSneakerName} placeholder="Sneaker Name" style={styles.fieldInput} />
        </View>
        <View style={styles.fieldWrap}>
          <View style={styles.fieldIcon}>
            <FileText color={colors.accent} size={24} />
          </View>
          <AppInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
            style={[styles.fieldInput, styles.multiline]}
            error={error}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.sectionTitle}>
          <View style={styles.darkIcon}>
            <SlidersHorizontal color={colors.accent} size={24} />
          </View>
          <AppText variant="heading">Optional Details</AppText>
        </View>
        <View style={styles.fieldWrap}>
          <View style={styles.fieldIcon}>
            <Calendar color={colors.accent} size={24} />
          </View>
          <AppInput value={purchaseAddress} onChangeText={setPurchaseAddress} placeholder="Release Date" style={styles.fieldInput} />
        </View>
        <View style={styles.fieldWrap}>
          <View style={styles.fieldIcon}>
            <DollarSign color={colors.accent} size={24} />
          </View>
          <AppInput value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="Price" style={styles.fieldInput} />
        </View>
      </View>
      <View style={styles.previewCard}>
        <AppText variant="heading">Preview</AppText>
        <View style={styles.previewRow}>
          <AppImage uri={imageUri || sneakerPhotos.collection} style={styles.previewThumb} />
          <View style={styles.previewCopy}>
            <AppText variant="subheading">{sneakerName || 'Sneaker Name'}</AppText>
            <AppText accent>{brandName || 'Brand Name'}</AppText>
            <AppText variant="caption" muted numberOfLines={2}>
              {description || 'Your post description will appear here.'}
            </AppText>
          </View>
          {price ? <AppText style={styles.previewPrice}>${price}</AppText> : null}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  postButton: {
    width: 116,
    minHeight: 54,
    flexShrink: 0,
  },
  postLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  postText: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 15,
  },
  card: {
    gap: spacing.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sectionIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
  },
  blueIcon: {
    backgroundColor: colors.accentBlue,
  },
  darkIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  requiredBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255, 80, 100, 0.24)',
  },
  requiredText: {
    color: colors.danger,
    fontWeight: '900',
  },
  uploadBox: {
    height: 520,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderWidth: 2,
    overflow: 'hidden',
  },
  uploadContent: {
    alignItems: 'center',
    gap: spacing.md,
  },
  uploadIcon: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  fieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 74,
    borderRadius: radius.lg,
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  fieldIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
  },
  fieldInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  multiline: {
    minHeight: 130,
    textAlignVertical: 'top',
  },
  ballIcon: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 4,
    borderColor: colors.accent,
  },
  previewCard: {
    gap: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  previewThumb: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
  },
  previewCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  previewPrice: {
    color: colors.green,
    fontWeight: '900',
  },
});
