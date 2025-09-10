import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { Phone, Shield, TriangleAlert as AlertTriangle, MapPin, Clock, Heart } from 'lucide-react-native';

export default function EmergencyScreen() {
  const [isSOSActive, setIsSOSActive] = useState(false);

  const emergencyNumbers = [
    { service: 'Police', number: '911', icon: Shield },
    { service: 'Medical', number: '911', icon: Heart },
    { service: 'Fire', number: '911', icon: AlertTriangle },
  ];

  const handleSOS = () => {
    Alert.alert(
      'Emergency SOS',
      'This will contact emergency services and notify your emergency contacts. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Emergency Call',
          style: 'destructive',
          onPress: () => {
            setIsSOSActive(true);
            Linking.openURL('tel:911');
            // In a real app, this would also send location to emergency contacts
          },
        },
      ]
    );
  };

  const callEmergencyNumber = (number: string, service: string) => {
    Alert.alert(
      `Call ${service}`,
      `Calling ${service} at ${number}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          onPress: () => Linking.openURL(`tel:${number}`),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tourist Safety</Text>
        <Text style={styles.subtitle}>Emergency Services</Text>
      </View>

      {/* SOS Button */}
      <View style={styles.sosContainer}>
        <TouchableOpacity
          style={[styles.sosButton, isSOSActive && styles.sosButtonActive]}
          onPress={handleSOS}
          activeOpacity={0.8}>
          <Shield size={48} color="#FFFFFF" strokeWidth={3} />
          <Text style={styles.sosText}>EMERGENCY SOS</Text>
          <Text style={styles.sosSubtext}>Tap for immediate help</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Emergency Contacts</Text>
        <View style={styles.emergencyGrid}>
          {emergencyNumbers.map((emergency, index) => {
            const IconComponent = emergency.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.emergencyCard}
                onPress={() =>
                  callEmergencyNumber(emergency.number, emergency.service)
                }>
                <IconComponent size={32} color="#DC2626" strokeWidth={2} />
                <Text style={styles.emergencyService}>{emergency.service}</Text>
                <Text style={styles.emergencyNumber}>{emergency.number}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Safety Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Safety Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <MapPin size={20} color="#059669" strokeWidth={2} />
            <Text style={styles.statusText}>Location: New York, USA</Text>
          </View>
          <View style={styles.statusItem}>
            <Clock size={20} color="#059669" strokeWidth={2} />
            <Text style={styles.statusText}>Last Check-in: 2 hours ago</Text>
          </View>
          <View style={styles.statusIndicator}>
            <View style={styles.safeIndicator} />
            <Text style={styles.safeText}>Safe Zone</Text>
          </View>
        </View>
      </View>

      {/* Safety Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Alerts</Text>
        <View style={styles.alertCard}>
          <AlertTriangle size={20} color="#F59E0B" strokeWidth={2} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Weather Advisory</Text>
            <Text style={styles.alertText}>
              Heavy rain expected in your area. Exercise caution when traveling.
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.actionText}>Call Embassy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MapPin size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.actionText}>Share Location</Text>
          </TouchableOpacity>
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
  sosContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#DC2626',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  sosButtonActive: {
    backgroundColor: '#B91C1C',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  sosSubtext: {
    color: '#FECACA',
    fontSize: 12,
    textAlign: 'center',
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
  emergencyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyCard: {
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
  emergencyService: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  emergencyNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 4,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#059669',
  },
  safeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  alertCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#A16207',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
  },
});
