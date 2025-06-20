import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Award, TrendingUp, Mail, Phone, MapPin, Globe } from 'lucide-react-native';

const Profile = () => {
  const profileData = {
    name: 'Wamia Ambassador',
    email: 'ambassador@wamia.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    website: 'www.wamia-affiliate.com',
  };

  const profileStats = [
    { title: 'Referrals', value: '156', icon: Users, color: '#3B82F6' },
    { title: 'Total Earnings', value: '$2,450', icon: TrendingUp, color: '#10B981' },
    { title: 'Rank', value: 'Gold', icon: Award, color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileContent}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData.name}</Text>
                <Text style={styles.profileEmail}>{profileData.email}</Text>
                <View style={styles.profileBadge}>
                  <Award size={16} color="#F59E0B" />
                  <Text style={styles.badgeText}>Gold Member</Text>
                </View>
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Total Earnings</Text>
              <Text style={styles.balanceAmount}>$2,450.00</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}><Mail size={20} color="#64748B" /></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{profileData.email}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}><Phone size={20} color="#64748B" /></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profileData.phone}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}><MapPin size={20} color="#64748B" /></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{profileData.location}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}><Globe size={20} color="#64748B" /></View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{profileData.website}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingBottom: 100 },
  profileCard: { margin: 20, borderRadius: 16, overflow: 'hidden' },
  profileGradient: { padding: 20 },
  profileContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 16 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  profileEmail: { fontSize: 16, color: '#FFFFFF', opacity: 0.9, marginBottom: 12 },
  profileBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 12, color: '#FFFFFF', marginLeft: 4 },
  balanceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 16, color: '#FFFFFF', opacity: 0.9 },
  balanceAmount: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 32 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  statTitle: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', paddingHorizontal: 20, marginBottom: 16 },
  infoSection: { paddingHorizontal: 20, marginBottom: 32 },
  infoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12 },
  infoIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  infoValue: { fontSize: 16, color: '#0F172A' },
});

export default Profile;
