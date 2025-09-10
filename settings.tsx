import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { User, Bell, Shield, MapPin, Phone, Globe, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile Information',
          subtitle: 'Manage your personal details',
          action: () => Alert.alert('Profile', 'Opening profile settings...'),
        },
        {
          icon: Shield,
          label: 'Security & Privacy',
          subtitle: 'Password and privacy settings',
          action: () => Alert.alert('Security', 'Opening security settings...'),
        },
      ],
    },
    {
      title: 'Emergency Settings',
      items: [
        {
          icon: Phone,
          label: 'Emergency Contacts',
          subtitle: 'Manage trusted contacts',
          action: () => Alert.alert('Contacts', 'Opening emergency contacts...'),
        },
        {
          icon: MapPin,
          label: 'Location Preferences',
          subtitle: 'Configure location sharing',
          action: () => Alert.alert('Location', 'Opening location settings...'),
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          icon: Globe,
          label: 'Language & Region',
          subtitle: 'English (US)',
          action: () => Alert.alert('Language', 'Opening language settings...'),
        },
        {
          icon: Bell,
          label: 'Notification Center',
          subtitle: 'Manage alerts and notifications',
          action: () => Alert.alert('Notifications', 'Opening notification settings...'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          subtitle: 'FAQs and contact support',
          action: () => Alert.alert('Help', 'Opening help center...'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your safety preferences</Text>
      </View>

      {/* Quick Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Settings</Text>
        
        <View style={styles.settingCard}>
          <Bell size={20} color="#2563EB" strokeWidth={2} />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Emergency Notifications</Text>
            <Text style={styles.settingSubtitle}>Receive safety alerts</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
            thumbColor={notifications ? '#2563EB' : '#9CA3AF'}
          />
        </View>

        <View style={styles.settingCard}>
          <MapPin size={20} color="#059669" strokeWidth={2} />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Location Sharing</Text>
            <Text style={styles.settingSubtitle}>Share with trusted contacts</Text>
          </View>
          <Switch
            value={locationSharing}
            onValueChange={setLocationSharing}
            trackColor={{ false: '#E5E7EB', true: '#D1FAE5' }}
            thumbColor={locationSharing ? '#059669' : '#9CA3AF'}
          />
        </View>

        <View style={styles.settingCard}>
          <Shield size={20} color="#DC2626" strokeWidth={2} />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Emergency Mode</Text>
            <Text style={styles.settingSubtitle}>Enhanced safety features</Text>
          </View>
          <Switch
            value={emergencyMode}
            onValueChange={setEmergencyMode}
            trackColor={{ false: '#E5E7EB', true: '#FEE2E2' }}
            thumbColor={emergencyMode ? '#DC2626' : '#9CA3AF'}
          />
        </View>

        <View style={styles.settingCard}>
          <Moon size={20} color="#7C3AED" strokeWidth={2} />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingSubtitle}>Easier on the eyes</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E5E7EB', true: '#EDE9FE' }}
            thumbColor={darkMode ? '#7C3AED' : '#9CA3AF'}
          />
        </View>
      </View>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={itemIndex}
                style={styles.menuItem}
                onPress={item.action}>
                <IconComponent size={20} color="#6B7280" strokeWidth={2} />
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Emergency Information */}
      <View style={styles.section}>
        <View style={styles.emergencyInfo}>
          <Shield size={24} color="#DC2626" strokeWidth={2} />
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Features Active</Text>
            <Text style={styles.emergencyText}>
              Your safety settings are configured. In case of emergency, use the
              SOS button on the Emergency tab for immediate assistance.
            </Text>
          </View>
        </View>
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() =>
            Alert.alert(
              'Sign Out',
              'Are you sure you want to sign out?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive' },
              ]
            )
          }>
          <LogOut size={20} color="#DC2626" strokeWidth={2} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>Tourist Safety App</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoText}>
            Stay safe while traveling with real-time alerts, emergency contacts,
            and location sharing features.
          </Text>
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
  settingCard: {
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
  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  emergencyInfo: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#B91C1C',
    lineHeight: 20,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 8,
  },
  appInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appInfoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
