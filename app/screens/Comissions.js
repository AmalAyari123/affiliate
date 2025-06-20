// app/screens/Commissions.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CircleArrowUp as ArrowUpCircle,
  CircleArrowDown as ArrowDownCircle,
  X,
  Calendar,
  CreditCard,
  CircleCheck as CheckCircle,
  Search,
  Filter,
  Wallet,
  PiggyBank,
  Banknote,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import AppHeader from '../components/AppHeader';

export default function Commissions() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const commissionStats = [
    { title: t('commissions.totalEarned'), value: '$2,450.00', icon: DollarSign, color: '#10B981' },
    { title: t('commissions.availableBalance'), value: '$1,234.50', icon: Wallet, color: '#3B82F6' },
    { title: t('common.pending'), value: '$456.00', icon: Clock, color: '#F59E0B' },
    { title: t('commissions.thisMonth'), value: '$678.25', icon: TrendingUp, color: '#8B5CF6' },
  ];

  const commissionHistory = [
    { id: 1, type: 'commission',  description: 'Commission from John Doe purchase',      amount: '+$45.00',  date: '2024-01-15', status: 'completed', orderId: '#ORD-001' },
    { id: 2, type: 'withdrawal', description: 'PayPal withdrawal',                       amount: '-$200.00', date: '2024-01-14', status: 'completed', orderId: '#WD-002' },
    { id: 3, type: 'commission',  description: 'Commission from Sarah Johnson purchase', amount: '+$78.50',  date: '2024-01-13', status: 'pending',   orderId: '#ORD-003' },
    { id: 4, type: 'commission',  description: 'Commission from Mike Chen purchase',    amount: '+$125.00', date: '2024-01-12', status: 'completed', orderId: '#ORD-004' },
    { id: 5, type: 'refund',      description: 'Refund adjustment - Emma Davis',         amount: '-$32.50',  date: '2024-01-11', status: 'completed', orderId: '#REF-005' },
  ];

  const paymentMethods = [
    { id: 'paypal',    name: t('commissions.paypal'),       icon: CreditCard, color: '#0070BA' },
    { id: 'bank',      name: t('commissions.bankTransfer'), icon: Banknote,   color: '#10B981' },
    { id: 'skrill',    name: t('commissions.skrill'),       icon: Wallet,     color: '#8B5CF6' },
  ];

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt <= 0) {
      Alert.alert(t('common.error'), t('commissions.enterValidAmount'));
      return;
    }
    if (amt > 1234.50) {
      Alert.alert(t('common.error'), t('commissions.insufficientBalance'));
      return;
    }
    Alert.alert(
      t('commissions.withdrawalRequest'),
      t('commissions.withdrawalConfirm', { amount: withdrawAmount }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.confirm'),
          onPress: () => {
            setShowWithdrawModal(false);
            setWithdrawAmount('');
            Alert.alert(t('common.success'), t('commissions.withdrawalSuccess'));
          }
        }
      ]
    );
  };

  function getTransactionIcon(type) {
    switch (type) {
      case 'commission':  return ArrowUpCircle;
      case 'withdrawal': return ArrowDownCircle;
      case 'refund':     return X;
      default:           return DollarSign;
    }
  }
  function getTransactionColor(type) {
    switch (type) {
      case 'commission':  return '#10B981';
      case 'withdrawal': return '#3B82F6';
      case 'refund':     return '#EF4444';
      default:           return '#64748B';
    }
  }
  function getStatusColor(status) {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending':   return '#F59E0B';
      case 'failed':    return '#EF4444';
      default:          return '#64748B';
    }
  }

  const filteredTransactions = commissionHistory.filter(tx => {
    const q = searchQuery.toLowerCase();
    return (
      (tx.description.toLowerCase().includes(q) ||
       tx.orderId.toLowerCase().includes(q)) &&
      (selectedFilter === 'all' || tx.type === selectedFilter)
    );
  });

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      <AppHeader
        title={t('navigation.commissions')}
        variant="gradient"
        showLogo
        showActions
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Withdraw button */}
        <View style={[styles.headerActions, isRTL && styles.rtlHeaderActions]}>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={() => setShowWithdrawModal(true)}
          >
            <ArrowUpCircle size={20} color="#FFF" />
            <Text style={[styles.withdrawButtonText, isRTL && styles.rtlText]}>
              {t('commissions.withdrawFunds')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={['#10B981','#3B82F6']}
            style={styles.balanceGradient}
            start={{x:0,y:0}}
            end={{x:1,y:1}}
          >
            <View style={[styles.balanceHeader, isRTL && styles.rtlBalanceHeader]}>
              <Text style={[styles.balanceLabel, isRTL && styles.rtlText]}>
                {t('commissions.availableBalance')}
              </Text>
              <PiggyBank size={24} color="#FFF" />
            </View>
            <Text style={[styles.balanceAmount, isRTL && styles.rtlText]}>$1,234.50</Text>
            <View style={[styles.balanceFooter, isRTL && styles.rtlBalanceFooter]}>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceInfoLabel, isRTL && styles.rtlText]}>
                  {t('common.pending')}
                </Text>
                <Text style={[styles.balanceInfoValue, isRTL && styles.rtlText]}>
                  $456.00
                </Text>
              </View>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceInfoLabel, isRTL && styles.rtlText]}>
                  {t('commissions.thisMonth')}
                </Text>
                <Text style={[styles.balanceInfoValue, isRTL && styles.rtlText]}>
                  $678.25
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stat cards */}
        <View style={[styles.statsContainer, isRTL && styles.rtlStatsContainer]}>
          {commissionStats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, isRTL && styles.rtlText]}>
                {stat.value}
              </Text>
              <Text style={[styles.statTitle, isRTL && styles.rtlText]}>
                {stat.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('commissions.quickActions')}
        </Text>
        <View style={[styles.quickActions, isRTL && styles.rtlQuickActions]}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setShowWithdrawModal(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F615' }]}>
              <ArrowUpCircle size={24} color="#3B82F6" />
            </View>
            <Text style={[styles.actionTitle, isRTL && styles.rtlText]}>
              {t('commissions.withdrawFunds')}
            </Text>
            <Text style={[styles.actionSubtitle, isRTL && styles.rtlText]}>
              {t('commissions.requestPayout')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#10B98115' }]}>
              <Calendar size={24} color="#10B981" />
            </View>
            <Text style={[styles.actionTitle, isRTL && styles.rtlText]}>
              {t('commissions.paymentSchedule')}
            </Text>
            <Text style={[styles.actionSubtitle, isRTL && styles.rtlText]}>
              {t('commissions.viewDates')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search & filter */}
        <View style={[styles.searchContainer, isRTL && styles.rtlSearchContainer]}>
          <View style={[styles.searchInputContainer, isRTL && styles.rtlSearchInputContainer]}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={[styles.searchInput, isRTL && styles.rtlSearchInput]}
              placeholder={t('commissions.searchTransactions')}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
        >
          {['all','commission','withdrawal','refund'].map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterTab,
                selectedFilter===f && styles.activeFilterTab
              ]}
              onPress={() => setSelectedFilter(f)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter===f && styles.activeFilterTabText,
                  isRTL && styles.rtlText
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transaction list */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
          {t('commissions.transactionHistory')}
        </Text>
        <View style={styles.transactionList}>
          {filteredTransactions.map((tx,i) => {
            const Icon = getTransactionIcon(tx.type);
            return (
              <TouchableOpacity
                key={i}
                style={[styles.transactionItem, isRTL && styles.rtlTransactionItem]}
              >
                <View style={[styles.transactionIcon, { backgroundColor: `${getTransactionColor(tx.type)}15` }]}>
                  <Icon size={20} color={getTransactionColor(tx.type)} />
                </View>
                <View style={[styles.transactionInfo, isRTL && styles.rtlTransactionInfo]}>
                  <View style={[styles.transactionHeader, isRTL && styles.rtlTransactionHeader]}>
                    <Text style={[styles.transactionDescription, isRTL && styles.rtlText]}>
                      {tx.description}
                    </Text>
                    <Text style={[
                      styles.transactionAmount,
                      { color: tx.amount.includes('+') ? '#10B981' : '#EF4444' },
                      isRTL && styles.rtlText
                    ]}>
                      {tx.amount}
                    </Text>
                  </View>
                  <View style={[styles.transactionFooter, isRTL && styles.rtlTransactionFooter]}>
                    <Text style={[styles.transactionDate, isRTL && styles.rtlText]}>
                      {tx.date}
                    </Text>
                    <Text style={[styles.transactionOrderId, isRTL && styles.rtlText]}>
                      {tx.orderId}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(tx.status)}15` }]}>
                      <Text style={[
                        styles.statusText,
                        { color: getStatusColor(tx.status) },
                        isRTL && styles.rtlText
                      ]}>
                        {tx.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Withdrawal Modal */}
      <Modal
        visible={showWithdrawModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWithdrawModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isRTL && styles.rtlModal]}>
            <View style={[styles.modalHeader, isRTL && styles.rtlModalHeader]}>
              <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>
                {t('commissions.withdrawFunds')}
              </Text>
              <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={[styles.modalLabel, isRTL && styles.rtlText]}>
                {t('commissions.withdrawalAmount')}
              </Text>
              <TextInput
                style={[styles.input, isRTL && styles.rtlInput]}
                placeholder="0.00"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.modalFooter, isRTL && styles.rtlModalFooter]}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowWithdrawModal(false)}
              >
                <Text style={[styles.cancelButtonText, isRTL && styles.rtlText]}>
                  {t('common.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleWithdraw}
              >
                <Text style={[styles.confirmButtonText, isRTL && styles.rtlText]}>
                  {t('commissions.confirmWithdrawal')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100, // Increased padding to ensure content is not cut off by tab bar
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceInfo: {
    alignItems: 'center',
  },
  balanceInfoLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
    marginBottom: 4,
  },
  balanceInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginRight: '2%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTabs: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  transactionList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  transactionItem: {
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  transactionOrderId: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter-Bold',
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  // RTL styles
  rtlContainer: {
    writingDirection: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlHeaderActions: {
    flexDirection: 'row-reverse',
  },
  rtlBalanceHeader: {
    flexDirection: 'row-reverse',
  },
  rtlBalanceFooter: {
    flexDirection: 'row-reverse',
  },
  rtlStatsContainer: {
    flexDirection: 'row-reverse',
  },
  rtlQuickActions: {
    flexDirection: 'row-reverse',
  },
  rtlSearchContainer: {
    flexDirection: 'row-reverse',
  },
  rtlSearchInputContainer: {
    flexDirection: 'row-reverse',
  },
  rtlSearchInput: {
    textAlign: 'right',
  },
  rtlTransactionItem: {
    flexDirection: 'row-reverse',
  },
  rtlTransactionInfo: {
    alignItems: 'flex-end',
  },
  rtlTransactionHeader: {
    flexDirection: 'row-reverse',
  },
  rtlTransactionFooter: {
    flexDirection: 'row-reverse',
  },
  rtlModal: {
    // Removed invalid 'direction: rtl' property
  },
  rtlModalHeader: {
    flexDirection: 'row-reverse',
  },
  rtlModalFooter: {
    flexDirection: 'row-reverse',
  },
  rtlInput: {
    textAlign: 'right',
  },
  rtlPaymentMethod: {
    flexDirection: 'row-reverse',
  },

});
