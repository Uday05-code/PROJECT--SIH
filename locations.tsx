import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { MapPin, Share, Users, Clock, Navigation, Shield, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function LocationScreen() {
  const [isSharing, setIsSharing] = useState(false);
  const [lastLocation, setLastLocation] = useState('Times Square, NYC');

  const trustedContacts = [
    { name: 'John Doe', status: 'Active', lastSeen: '5 min ago' },
    { name: 'Jane Smith', status: 'Active', lastSeen: '12 min ago' },
    { name: 'Emergency Contact', status: 'Standby', lastSeen: '1 hour ago' },
  ];

  const handleStartSharing = () => {
    setIsSharing(!isSharing);
    Alert.alert(
      isSharing ? 'Stop Location Sharing' : 'Start Location Sharing',
      isSharing
        ? 'Your location will no longer be shared with trusted contacts'
        : 'Your location will be shared with your trusted contacts every 15 minutes',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: isSharing ? 'Stop Sharing' : 'Start Sharing',
          onPress: () => {
            // In a real app, this would start/stop location sharing
            Alert.alert(
              'Success',
              isSharing
                ? 'Location sharing stopped'
                : 'Location sharing started'
            );
          },
        },
      ]
    );
  };

  const sendQuickLocation = () => {
    Alert.alert(
      'Share Current Location',
      'Send your current location to all trusted contacts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Location',
          onPress: () =>
            Alert.alert('Success', 'Location sent to trusted contacts'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Services</Text>
        <Text style={styles.subtitle}>Share your location safely</Text>
      </View>

      {/* Current Location */}
      <View style={styles.section}>
        <View style={styles.locationCard}>
          <MapPin size={24} color="#2563EB" strokeWidth={2} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationText}>{lastLocation}</Text>
            <Text style={styles.locationTime}>Updated 2 minutes ago</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Navigation size={20} color="#2563EB" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Sharing Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Sharing</Text>
        <View style={styles.sharingCard}>
          <View style={styles.sharingStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isSharing ? '#059669' : '#DC2626' },
              ]}
            />
            <Text style={styles.sharingText}>
              {isSharing ? 'Sharing Active' : 'Sharing Inactive'}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.sharingButton,
              { backgroundColor: isSharing ? '#DC2626' : '#059669' },
            ]}
            onPress={handleStartSharing}>
            <Text style={styles.sharingButtonText}>
              {isSharing ? 'Stop Sharing' : 'Start Sharing'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={sendQuickLocation}>
            <Share size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.actionTitle}>Send Location</Text>
            <Text style={styles.actionSubtext}>Share current position</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Shield size={24} color="#059669" strokeWidth={2} />
            <Text style={styles.actionTitle}>Safe Check-in</Text>
            <Text style={styles.actionSubtext}>Mark yourself as safe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trusted Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trusted Contacts</Text>
        {trustedContacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <Users size={20} color="#6B7280" strokeWidth={2} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactStatus}>
                {contact.status} • {contact.lastSeen}
              </Text>
            </View>
            <View
              style={[
                styles.contactStatusDot,
                {
                  backgroundColor:
                    contact.status === 'Active' ? '#059669' : '#F59E0B',
                },
              ]}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addContactButton}>
          <Text style={styles.addContactText}>+ Add Trusted Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Zone Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Information</Text>
        <View style={styles.safetyCard}>
          <AlertCircle size={20} color="#F59E0B" strokeWidth={2} />
          <View style={styles.safetyInfo}>
            <Text style={styles.safetyTitle}>Tourist Area Advisory</Text>
            <Text style={styles.safetyText}>
              You're in a well-monitored tourist area. Stay aware of your
              surroundings and keep valuables secure.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  locationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  sharingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sharingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sharingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  sharingButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sharingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  actionSubtext: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactStatus: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  contactStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  addContactButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addContactText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563EB',
  },
  safetyCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  safetyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  safetyText: {
    fontSize: 14,
    color: '#A16207',
    lineHeight: 20,
  },
});
