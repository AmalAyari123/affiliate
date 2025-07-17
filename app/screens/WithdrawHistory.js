import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {
  ArrowLeft,
  CircleArrowDown as ArrowDownCircle,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getWithdrawHistory } from '../api/withdrawApi';

const WithdrawHistory = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadWithdrawHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getWithdrawHistory();
      
      console.log('Withdraw history result:', result);
      
      if (result.success) {
        console.log('Setting withdraws data:', result.data);
        setWithdraws(result.data || []);
      } else {
        console.log('Error loading withdraw history:', result.error);
        setError(result.error || 'Failed to load withdraw history');
      }
    } catch (err) {
      console.error('Exception in loadWithdrawHistory:', err);
      setError('An error occurred while loading withdraw history');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadWithdrawHistory();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadWithdrawHistory();
    setRefreshing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 1: return CheckCircle; // Completed
      case 2: return Clock; // Pending
      case 3: return XCircle; // Rejected
      case 0: return Clock; // Pending (alternative)
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return '#10B981'; // Completed
      case 2: return '#F59E0B'; // Pending
      case 3: return '#EF4444'; // Rejected
      case 0: return '#F59E0B'; // Pending (alternative)
      default: return '#64748B'; // Unknown
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1: return 'Completed';
      case 2: return 'Pending';
      case 3: return 'Rejected';
      case 0: return 'Pending';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  const formatAmount = (amount) => {
    return parseFloat(amount || 0).toFixed(2);
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      <AppHeader
        title="Withdraw History"
        variant="gradient"
        showLogo
        showActions
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading withdraw history...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadWithdrawHistory}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : withdraws.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ArrowDownCircle size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>No withdraw history found</Text>
            <Text style={styles.emptySubtext}>Your withdraw requests will appear here</Text>
          </View>
        ) : (
          <View style={styles.withdrawList}>
            {withdraws.map((withdraw, index) => {
              const StatusIcon = getStatusIcon(withdraw.status);
              const statusColor = getStatusColor(withdraw.status);
              const statusText = getStatusText(withdraw.status);
              
              return (
                <View
                  key={withdraw.withdraw_id || index}
                  style={[styles.withdrawItem, isRTL && styles.rtlWithdrawItem]}
                >
                  <View style={[styles.withdrawIcon, { backgroundColor: `${statusColor}15` }]}>
                    <StatusIcon size={20} color={statusColor} />
                  </View>
                  <View style={[styles.withdrawInfo, isRTL && styles.rtlWithdrawInfo]}>
                    <View style={[styles.withdrawHeader, isRTL && styles.rtlWithdrawHeader]}>
                      <Text style={[styles.withdrawDescription, isRTL && styles.rtlText]}>
                        {withdraw.withdraw_description || 'Withdrawal Request'}
                      </Text>
                      <Text style={[styles.withdrawAmount, isRTL && styles.rtlText]}>
                        -{formatAmount(withdraw.amount)}
                        <Text style={styles.currency}> DT</Text>
                      </Text>
                    </View>
                    <View style={[styles.withdrawFooter, isRTL && styles.rtlWithdrawFooter]}>
                      <Text style={[styles.withdrawDate, isRTL && styles.rtlText]}>
                        {formatDate(withdraw.created_at)}
                      </Text>
                      <Text style={[styles.withdrawMethod, isRTL && styles.rtlText]}>
                        {withdraw.payment_method || 'Bank Transfer'}
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
                        <Text style={[styles.statusText, { color: statusColor }, isRTL && styles.rtlText]}>
                          {statusText}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748B',
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  withdrawList: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
  },
  withdrawItem: {
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
  withdrawIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  withdrawInfo: {
    flex: 1,
  },
  withdrawHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  withdrawDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  withdrawAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
    fontFamily: 'Inter-Bold',
  },
  withdrawFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawDate: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  withdrawMethod: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  currency: {
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 2,
    fontFamily: 'Inter-Regular',
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlWithdrawItem: {
    flexDirection: 'row-reverse',
  },
  rtlWithdrawInfo: {
    alignItems: 'flex-end',
  },
  rtlWithdrawHeader: {
    flexDirection: 'row-reverse',
  },
  rtlWithdrawFooter: {
    flexDirection: 'row-reverse',
  },
});

export default WithdrawHistory; 