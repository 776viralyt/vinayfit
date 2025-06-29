import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserRole } from '@/contexts/UserContext';
import { useColorScheme, getColors } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect } from 'react';

// Import role-specific profile views
import ProfileClientView from '@/components/profile/ProfileClientView';
import ProfileTrainerView from '@/components/profile/ProfileTrainerView';
import ProfileNutritionistView from '@/components/profile/ProfileNutritionistView';
import ProfileAdminView from '@/components/profile/ProfileAdminView';
import ProfileHRView from '@/components/profile/ProfileHRView';

export default function ProfileScreen() {
  const { userRole } = useUserRole();
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  useEffect(() => {
    if (!userRole) {
      router.replace('/(auth)/login');
    }
  }, [userRole]);

  if (!userRole) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  // Render appropriate profile view based on user role
  switch (userRole) {
    case 'client':
      return <ProfileClientView />;
    case 'trainer':
      return <ProfileTrainerView />;
    case 'nutritionist':
      return <ProfileNutritionistView />;
    case 'admin':
      return <ProfileAdminView />;
    case 'hr':
      return <ProfileHRView />;
    default:
      return <ProfileClientView />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});