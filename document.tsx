import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { FileText, Download, Upload, Share, Lock, Shield, Camera, Eye, Plus, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Passport',
      type: 'passport',
      status: 'verified',
      lastUpdated: '2 days ago',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Travel Insurance',
      type: 'insurance',
      status: 'verified',
      lastUpdated: '5 days ago',
      size: '1.2 MB',
    },
    {
      id: 3,
      name: 'Emergency Contacts',
      type: 'contacts',
      status: 'verified',
      lastUpdated: '1 week ago',
      size: '0.8 MB',
    },
    {
      id: 4,
      name: 'Hotel Booking',
      type: 'booking',
      status: 'pending',
      lastUpdated: '3 days ago',
      size: '1.1 MB',
    },
  ]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'passport':
        return <FileText size={24} color="#2563EB" strokeWidth={2} />;
      case 'insurance':
        return <Shield size={24} color="#059669" strokeWidth={2} />;
      case 'contacts':
        return <FileText size={24} color="#F59E0B" strokeWidth={2} />;
      case 'booking':
        return <FileText size={24} color="#7C3AED" strokeWidth={2} />;
      default:
        return <FileText size={24} color="#6B7280" strokeWidth={2} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#059669';
      case 'pending':
        return '#F59E0B';
      case 'expired':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const handleDocumentAction = (action: string, docName: string) => {
    Alert.alert(
      `${action} Document`,
      `${action} ${docName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          onPress: () => Alert.alert('Success', `${action} completed`),
        },
      ]
    );
  };

  const addNewDocument = () => {
    Alert.alert(
      'Add Document',
      'Choose how to add your document',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Photo',
          onPress: () => Alert.alert('Camera', 'Opening camera...'),
        },
        {
          text: 'Upload File',
          onPress: () => Alert.alert('Upload', 'Opening file picker...'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Storage</Text>
        <Text style={styles.subtitle}>Secure backup of important documents</Text>
      </View>

      {/* Security Notice */}
      <View style={styles.section}>
        <View style={styles.securityNotice}>
          <Lock size={20} color="#2563EB" strokeWidth={2} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Secure Storage</Text>
            <Text style={styles.noticeText}>
              All documents are encrypted and stored securely on your device
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.quickAction} onPress={addNewDocument}>
            <Plus size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.quickActionText}>Add Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Camera size={24} color="#059669" strokeWidth={2} />
            <Text style={styles.quickActionText}>Scan Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Download size={24} color="#7C3AED" strokeWidth={2} />
            <Text style={styles.quickActionText}>Backup All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Document List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Documents</Text>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              {getDocumentIcon(doc.type)}
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <View style={styles.documentMeta}>
                  <Text style={styles.documentSize}>{doc.size}</Text>
                  <Text style={styles.documentDate}>• {doc.lastUpdated}</Text>
                </View>
              </View>
              <View style={styles.documentStatus}>
                <CheckCircle
                  size={16}
                  color={getStatusColor(doc.status)}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(doc.status) },
                  ]}>
                  {doc.status}
                </Text>
              </View>
            </View>
            <View style={styles.documentActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDocumentAction('View', doc.name)}>
                <Eye size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDocumentAction('Share', doc.name)}>
                <Share size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDocumentAction('Download', doc.name)}>
                <Download size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Emergency Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Access</Text>
        <View style={styles.emergencyCard}>
          <Shield size={24} color="#DC2626" strokeWidth={2} />
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Document Access</Text>
            <Text style={styles.emergencyText}>
              In case of emergency, your trusted contacts can access essential
              documents like passport and insurance details.
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Configure Access</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Storage Info */}
      <View style={styles.section}>
        <View style={styles.storageInfo}>
          <Text style={styles.storageTitle}>Storage Used</Text>
          <Text style={styles.storageText}>5.5 MB of 50 MB used</Text>
          <View style={styles.storageBar}>
            <View style={styles.storageProgress} />
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
  securityNotice: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: '#3730A3',
    lineHeight: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
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
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  emergencyCard: {
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
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  storageInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  storageText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  storageBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  storageProgress: {
    width: '11%',
    height: '100%',
    backgroundColor: '#2563EB',
  },
});
