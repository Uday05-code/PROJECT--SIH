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
import { Phone, MapPin, Building, Shield, Heart, TriangleAlert as AlertTriangle, Plus, Star } from 'lucide-react-native';

export default function ContactsScreen() {
  const emergencyContacts = [
    {
      name: 'Local Police',
      number: '911',
      description: 'Emergency law enforcement',
      icon: Shield,
      type: 'emergency',
    },
    {
      name: 'Medical Emergency',
      number: '911',
      description: 'Ambulance and medical services',
      icon: Heart,
      type: 'emergency',
    },
    {
      name: 'Fire Department',
      number: '911',
      description: 'Fire and rescue services',
      icon: AlertTriangle,
      type: 'emergency',
    },
  ];

  const localServices = [
    {
      name: 'US Embassy',
      number: '+1-555-0123',
      address: '123 Embassy Row, Washington DC',
      icon: Building,
      type: 'diplomatic',
    },
    {
      name: 'Tourist Police',
      number: '+1-555-0456',
      address: 'Downtown Tourist Center',
      icon: Shield,
      type: 'service',
    },
    {
      name: 'Medical Center',
      number: '+1-555-0789',
      address: '456 Health Avenue',
      icon: Heart,
      type: 'medical',
    },
  ];

  const personalContacts = [
    {
      name: 'John Doe',
      number: '+1-555-1234',
      relationship: 'Emergency Contact',
      trusted: true,
    },
    {
      name: 'Jane Smith',
      number: '+1-555-5678',
      relationship: 'Family',
      trusted: true,
    },
    {
      name: 'Travel Insurance',
      number: '+1-555-9012',
      relationship: 'Insurance Provider',
      trusted: false,
    },
  ];

  const makeCall = (number: string, name: string) => {
    Alert.alert(
      `Call ${name}`,
      `Calling ${name} at ${number}`,
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
        <Text style={styles.title}>Emergency Contacts</Text>
        <Text style={styles.subtitle}>Important numbers for your safety</Text>
      </View>

      {/* Emergency Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Services</Text>
        {emergencyContacts.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.emergencyCard}
              onPress={() => makeCall(contact.number, contact.name)}>
              <View style={styles.emergencyIcon}>
                <IconComponent size={24} color="#FFFFFF" strokeWidth={2} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.emergencyName}>{contact.name}</Text>
                <Text style={styles.emergencyDescription}>
                  {contact.description}
                </Text>
              </View>
              <Text style={styles.emergencyNumber}>{contact.number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Local Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Services</Text>
        {localServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <View key={index} style={styles.serviceCard}>
              <IconComponent size={20} color="#2563EB" strokeWidth={2} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <TouchableOpacity
                  onPress={() => makeCall(service.number, service.name)}>
                  <Text style={styles.serviceNumber}>{service.number}</Text>
                </TouchableOpacity>
                <View style={styles.addressContainer}>
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.serviceAddress}>{service.address}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Personal Contacts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Contacts</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#2563EB" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        {personalContacts.map((contact, index) => (
          <View key={index} style={styles.personalCard}>
            <View style={styles.personalInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.personalName}>{contact.name}</Text>
                {contact.trusted && (
                  <Star size={16} color="#F59E0B" strokeWidth={2} fill="#F59E0B" />
                )}
              </View>
              <Text style={styles.personalRelationship}>
                {contact.relationship}
              </Text>
              <TouchableOpacity
                onPress={() => makeCall(contact.number, contact.name)}>
                <Text style={styles.personalNumber}>{contact.number}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => makeCall(contact.number, contact.name)}>
              <Phone size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.actionText}>Add Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Shield size={24} color="#059669" strokeWidth={2} />
            <Text style={styles.actionText}>Emergency Alert</Text>
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
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 20,
  },
  emergencyCard: {
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
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  emergencyIcon: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  emergencyNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  personalCard: {
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
  personalInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  personalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  personalRelationship: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  personalNumber: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
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
