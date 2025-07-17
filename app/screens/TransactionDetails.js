import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  User,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TransactionDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction, campaignName } = route.params;
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const isCommission = transaction.type === 1;
  const isWithdrawal = transaction.type === 2;

  function getTransactionColor(type) {
    if (type === 1) return '#10B981';
    if (type === 2) return '#3B82F6';
    return '#64748B';
  }

  function getStatusColor(status) {
    if (status === 3) return '#10B981';
    if (status === 2) return '#F59E0B';
    return '#64748B';
  }

  function getStatusText(status) {
    if (status === 3) return 'Completed';
    if (status === 2) return 'Pending';
    return 'Unknown';
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  const getDescription = () => {
    if (isCommission) {
      return `Commission earned from ${transaction.customer_firstname || transaction.extension_attributes?.customer_firstname || ''} ${transaction.customer_lastname || transaction.extension_attributes?.customer_lastname || ''}'s order`;
    }
    if (isWithdrawal) {
      return 'Withdrawal';
    }
    return 'Transaction';
  };

  const getAmount = () => {
    if (isCommission) return `+${transaction.amount} DT`;
    if (isWithdrawal) return `-${transaction.amount} DT`;
    return `${transaction.amount} DT`;
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      {/* Header */}
      <View style={[styles.header, isRTL && styles.rtlHeader]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
     
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction Card */}
        <View style={styles.transactionCard}>
          <LinearGradient
            colors={['#10B981', '#3B82F6']}
            style={styles.transactionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.transactionHeader, isRTL && styles.rtlTransactionHeader]}>
              <Text style={[styles.transactionLabel, isRTL && styles.rtlText]}>
                {getDescription()}
              </Text>
              <DollarSign size={24} color="#FFF" />
            </View>
            <Text style={[styles.transactionAmount, isRTL && styles.rtlText]}>
              {getAmount()}
            </Text>
            <View style={[styles.statusContainer, isRTL && styles.rtlStatusContainer]}>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(transaction.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                  {getStatusText(transaction.status)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
           Transaction Details
          </Text>

          {/* Campaign Name */}
          {isCommission && campaignName && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#8B5CF615' }]}>
                <Package size={20} color="#8B5CF6" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Campaign
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {campaignName}
                </Text>
              </View>
            </View>
          )}

          {/* Product Name */}
          {transaction.product_name && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#10B98115' }]}>
                <Package size={20} color="#10B981" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Product
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {transaction.product_name}
                </Text>
              </View>
            </View>
          )}

          {/* Product Price */}
          {isCommission && transaction.product_price !== undefined && transaction.product_price !== null && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#F59E0B15' }]}>
                <DollarSign size={20} color="#F59E0B" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Product Price
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {transaction.product_price} DT
                </Text>
              </View>
            </View>
          )}

          {/* Commission Amount */}
          {isCommission && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#F59E0B15' }]}>
                <DollarSign size={20} color="#F59E0B" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Commission Earned
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {transaction.amount} DT
                </Text>
              </View>
            </View>
          )}

          {/* Customer Name */}
          {isCommission && (transaction.customer_firstname || transaction.extension_attributes?.customer_firstname) && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#3B82F615' }]}>
                <User size={20} color="#3B82F6" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Customer
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {transaction.customer_firstname || transaction.extension_attributes?.customer_firstname || ''} {transaction.customer_lastname || transaction.extension_attributes?.customer_lastname || ''}
                </Text>
              </View>
            </View>
          )}

          {/* Order ID */}
          {transaction.order_increment_id && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#EF444415' }]}>
                <Package size={20} color="#EF4444" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Order ID
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {transaction.order_increment_id}
                </Text>
              </View>
            </View>
          )}

          {/* Transaction ID */}
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <View style={[styles.detailIcon, { backgroundColor: '#64748B15' }]}>
              <Package size={20} color="#64748B" />
            </View>
            <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
              <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                Transaction ID
              </Text>
              <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                #{transaction.transaction_id}
              </Text>
            </View>
          </View>

          {/* Created Date */}
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <View style={[styles.detailIcon, { backgroundColor: '#8B5CF615' }]}>
              <Calendar size={20} color="#8B5CF6" />
            </View>
            <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
              <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                Created Date
              </Text>
              <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                {formatDate(transaction.created_at)}
              </Text>
            </View>
          </View>

          {/* Updated Date */}
          {transaction.updated_at && transaction.updated_at !== transaction.created_at && (
            <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
              <View style={[styles.detailIcon, { backgroundColor: '#F59E0B15' }]}>
                <Clock size={20} color="#F59E0B" />
              </View>
              <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
                <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                  Updated Date
                </Text>
                <Text style={[styles.detailValue, isRTL && styles.rtlText]}>
                  {formatDate(transaction.updated_at)}
                </Text>
              </View>
            </View>
          )}

          {/* Status */}
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <View style={[styles.detailIcon, { backgroundColor: `${getStatusColor(transaction.status)}15` }]}>
              {transaction.status === 3 ? (
                <CheckCircle size={20} color={getStatusColor(transaction.status)} />
              ) : (
                <Clock size={20} color={getStatusColor(transaction.status)} />
              )}
            </View>
            <View style={[styles.detailContent, isRTL && styles.rtlDetailContent]}>
              <Text style={[styles.detailLabel, isRTL && styles.rtlText]}>
                Status
              </Text>
              <Text style={[styles.detailValue, { color: getStatusColor(transaction.status) }, isRTL && styles.rtlText]}>
                {getStatusText(transaction.status)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  placeholder: {
    width: 40,
  },
  transactionCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  transactionGradient: {
    padding: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
    flex: 1,
    marginRight: 12,
  },
  transactionAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  rtlTransactionHeader: {
    flexDirection: 'row-reverse',
  },
  rtlStatusContainer: {
    alignItems: 'flex-end',
  },
  rtlDetailRow: {
    flexDirection: 'row-reverse',
  },
  rtlDetailContent: {
    alignItems: 'flex-end',
  },
}); 