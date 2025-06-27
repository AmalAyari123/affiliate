// app/screens/Commissions.js
import React, { useState, useRef, useEffect } from 'react';
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
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  ActivityIndicator,
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
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@devvie/bottom-sheet';
import { withdrawFunds } from '../api/withdrawApi';
import { getAffiliateAccount } from '../api/authApi';


export default function Commissions() {
    const navigation = useNavigation();
  
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const sheetRef = useRef(null);
  const [numberCard, setNumberCard] = useState('');
  const [userName, setUserName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isCVCFocused, setIsCVCFocused] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Withdraw form state
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState({ 
    balance: 0, 
    holding_balance: 0, 
    total_commission: 0,
    created_at: null 
  });
  const [thisMonthCommission, setThisMonthCommission] = useState(0);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await getAffiliateAccount();
      if (res.success) {
        setAccount({
          balance: res.data.balance || 0,
          holding_balance: res.data.holding_balance || 0,
          total_commission: res.data.total_commission || 0,
          created_at: res.data.created_at || null,
        });
        
        // Calculate this month's commission based on created_at
        if (res.data.created_at) {
          const createdDate = new Date(res.data.created_at);
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          
          // If account was created this month, use total_commission
          // Otherwise, you might want to fetch monthly data from API
          if (createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear) {
            setThisMonthCommission(res.data.total_commission || 0);
          } else {
            // For now, we'll use a portion of total_commission as this month's
            // In a real implementation, you'd fetch monthly commission data
            setThisMonthCommission(Math.round((res.data.total_commission || 0) * 0.3));
          }
        }
      }
    };
    fetchAccount();
  }, []);

  const commissionStats = [
    { title: t('commissions.totalEarned'), value: `$${account.total_commission}`, icon: DollarSign, color: '#10B981' },
    { title: t('commissions.availableBalance'), value: `$${account.balance}`, icon: Wallet, color: '#3B82F6' },
    { title: t('common.pending'), value: `$${account.holding_balance}`, icon: Clock, color: '#F59E0B' },
    { title: t('commissions.thisMonth'), value: `$${thisMonthCommission}`, icon: TrendingUp, color: '#8B5CF6' },
  ];

  const commissionHistory = [
    { id: 1, type: 'commission',  description: 'Commission from John Doe purchase',      amount: '+$45.00',  date: '2024-01-15', status: 'completed', orderId: '#ORD-001' },
    { id: 2, type: 'withdrawal', description: 'PayPal withdrawal',                       amount: '-$200.00', date: '2024-01-14', status: 'completed', orderId: '#WD-002' },
    { id: 3, type: 'commission',  description: 'Commission from Sarah Johnson purchase', amount: '+$78.50',  date: '2024-01-13', status: 'pending',   orderId: '#ORD-003' },
    { id: 4, type: 'commission',  description: 'Commission from Mike Chen purchase',    amount: '+$125.00', date: '2024-01-12', status: 'completed', orderId: '#ORD-004' },
    { id: 5, type: 'refund',      description: 'Refund adjustment - Emma Davis',         amount: '-$32.50',  date: '2024-01-11', status: 'completed', orderId: '#REF-005' },
  ];

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

  const handleExpirationDateChange = (text) => {
    const cleanedText = text.replace(/[^\d]/g, '');
    if (cleanedText.length <= 2) {
      setExpirationDate(cleanedText);
    } else if (cleanedText.length > 2 && cleanedText.length <= 4) {
      setExpirationDate(cleanedText.slice(0, 2) + '/' + cleanedText.slice(2));
    } else {
      setExpirationDate(cleanedText.slice(0, 2) + '/' + cleanedText.slice(2, 4));
    }
  };

  const formatCardNumber = () => {
    let formattedNumber = '';
    const ribLength = 20;
    for (let i = 0; i < ribLength; i++) {
      if (i < numberCard.length) {
        formattedNumber += numberCard[i];
      } else {
        formattedNumber += '•';
      }
      if ((i + 1) % 4 === 0 && i !== ribLength - 1) {
        formattedNumber += ' ';
      }
    }
    return formattedNumber;
  };
  

  const maskCvc = () => cvc.replace(/./g, '*');

  const handleCVCFocus = () => {
    setIsCVCFocused(true);
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const handleCVCBlur = () => {
    setIsCVCFocused(false);
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  // Helper for RIB input (20 digits max)
  const handleRibChange = (text) => {
    const cleaned = text.replace(/[^\d]/g, '');
    setNumberCard(cleaned.slice(0, 20));
  };

  // API call for withdraw
  const handleSendRequest = async () => {
    if (!userName || !numberCard || !amount) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    
    // Validate amount against available balance
    const requestedAmount = parseFloat(amount);
    if (requestedAmount > account.balance) {
      Alert.alert('Error', 'The amount you requested is not enough to be withdrawn');
      return;
    }
    
    setLoading(true);
    const result = await withdrawFunds({ accountHolder: userName, amount, rib: numberCard, message });
    setLoading(false);
    if (result.success) {
      if (sheetRef.current && typeof sheetRef.current.close === 'function') {
        sheetRef.current.close();
      }
      setUserName(''); setNumberCard(''); setAmount(''); setMessage('');
      Alert.alert('Success', 'Withdrawal request sent successfully.');
    } else {
      Alert.alert('Error', result.error || 'Failed to send request.');
    }
  };

  // Update the Quick Actions section to use the modal
  const handleQuickActionWithdraw = () => {
    if (sheetRef.current && typeof sheetRef.current.open === 'function') {
      sheetRef.current.open();
    }
  };

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
            <Text style={[styles.balanceAmount, isRTL && styles.rtlText]}>${account.balance}</Text>
            <View style={[styles.balanceFooter, isRTL && styles.rtlBalanceFooter]}>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceInfoLabel, isRTL && styles.rtlText]}>
                  {t('common.pending')}
                </Text>
                <Text style={[styles.balanceInfoValue, isRTL && styles.rtlText]}>
                  ${account.holding_balance}
                </Text>
              </View>
              <View style={styles.balanceInfo}>
                <Text style={[styles.balanceInfoLabel, isRTL && styles.rtlText]}>
                  {t('commissions.thisMonth')}
                </Text>
                <Text style={[styles.balanceInfoValue, isRTL && styles.rtlText]}>
                  ${thisMonthCommission}
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
            onPress={handleQuickActionWithdraw}
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

      <BottomSheet ref={sheetRef} style={{alignItems:'center'}} disableDragHandlePanning={true} height={600}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          enabled={true}
        >
          <View style={{width:'100%', alignItems:'center', flex: 1}}>
            {/* Card visualization */}
            <View style={{alignItems:'center', width:'100%', marginBottom:8}}>
              <ImageBackground
                source={require('../../assets/card-front.png')}
                style={{
                  height:120,
                  width:Dimensions.get('window').width -60,
                  alignItems:'flex-start',
                  justifyContent:'center',
                  marginBottom:10,
                  borderRadius:20,
                  overflow:'hidden',
                  padding:16,
                  position:'relative',
                }}
              >
                {/* Chip on the left */}
                <Image source={require('../../assets/chip.png')} style={{
                  height:28, width:42, position:'absolute', top:18, left:16
                }}/>
                {/* Visa logo on the right */}
                <Image source={require('../../assets/visa.png')} style={{
                  height:28, width:50, position:'absolute', top:10, right:16
                }}/>
                {/* Card holder */}
                <Text style={{color:'#fff', fontSize:16, fontFamily:'EbrimaBold', marginBottom:6, textTransform:'uppercase', position:'absolute', bottom:16, left:16}}>{userName || 'XXXX XXXX'}</Text>
                {/* Card number (RIB) */}
                <Text style={{color:'#fff', fontSize:15, fontFamily:'Ebrima', letterSpacing:2, position:'absolute', top:60, left:16}}>{formatCardNumber()}</Text>
              </ImageBackground>
            </View>
            {/* Scrollable fields */}
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              style={{width:'100%'}} 
              contentContainerStyle={{alignItems:'center', paddingBottom:80}}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="none"
            >
              <View style={{alignItems:'flex-start', width:'90%', marginBottom:8}}>
                <Text numberOfLines={1} style={{
                  color:'#7f7f7f', fontFamily:'EbrimaBold', fontSize:13, paddingLeft:2, marginBottom:2
                }}>Account Holder</Text>
                <TextInput
                  style={{
                    padding:6, width:'100%',
                    borderBottomColor:'#7f7f7f',borderWidth:1,borderColor:'transparent', fontSize:14
                  }}
                  onChangeText={setUserName}
                  value={userName}
                  placeholder="xxxx xxxx"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={{alignItems:'flex-start', width:'90%', marginBottom:8}}>
                <Text style={{
                  color:'#7f7f7f', fontFamily:'EbrimaBold', fontSize:13, paddingLeft:2, marginBottom:2
                }}>RIB</Text>
                <TextInput
                  style={{
                    padding:6, width:'100%',
                    borderBottomColor:'#7f7f7f',borderWidth:1,borderColor:'transparent', fontSize:14
                  }}
                  onChangeText={handleRibChange}
                  value={numberCard}
                  placeholder="•••• •••• •••• •••• ••••"
                  keyboardType="number-pad"
                  maxLength={20}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={{alignItems:'flex-start', width:'90%', marginBottom:8}}>
                <Text style={{
                  color:'#7f7f7f', fontFamily:'EbrimaBold', fontSize:13, paddingLeft:2, marginBottom:2
                }}>Amount</Text>
                <TextInput
                  style={{
                    padding:6, width:'100%',
                    borderBottomColor:'#7f7f7f',borderWidth:1,borderColor:'transparent', fontSize:14
                  }}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={{alignItems:'flex-start', width:'90%', marginBottom:8}}>
                <Text style={{
                  color:'#7f7f7f', fontFamily:'EbrimaBold', fontSize:13, paddingLeft:2, marginBottom:2
                }}>Message</Text>
                <TextInput
                  style={{
                    padding:6, width:'100%',
                    borderBottomColor:'#7f7f7f',borderWidth:1,borderColor:'transparent', fontSize:14, minHeight:40
                  }}
                  onChangeText={setMessage}
                  value={message}
                  placeholder="Message (optional)"
                  multiline
                  returnKeyType="done"
                  blurOnSubmit={true}
                />
              </View>
              <View style={{ width: '90%', alignItems: 'center', marginTop: 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0a6660',
              width: '100%',
              height: 44,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={handleSendRequest}
            disabled={loading}
          >
            {loading && <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />}
            <Text style={{ color: '#FFFFFF', fontFamily: 'EbrimaBold', fontSize: 16, letterSpacing: 1 }}>Send</Text>
          </TouchableOpacity>
        </View>

            </ScrollView>
            {/* Send button always visible at the bottom */}
          
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
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
    marginTop: 20,
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
    marginTop: 20,
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
