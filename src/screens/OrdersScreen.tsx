import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { orders } from '../data/orders';
import { useGame } from '../state/GameContext';
import { Panel } from '../components/Panel';
import { PrimaryButton } from '../components/PrimaryButton';

export const OrdersScreen = () => {
  const { state, completeOrder } = useGame();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {orders.map((order) => {
        const complete = state.completedOrders.includes(order.id);
        const eligible = state.lifetimeProduced >= order.requirement;
        return (
          <Panel key={order.id} title={order.title}>
            <Text style={styles.text}>Requirement: {order.requirement.toLocaleString()} total units</Text>
            <Text style={styles.text}>Reward: ${order.reward.toLocaleString()}</Text>
            <PrimaryButton text={complete ? 'Completed' : 'Claim Contract'} onPress={() => completeOrder(order.id)} disabled={!eligible || complete} />
          </Panel>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#101316' },
  content: { padding: 16 },
  text: { color: '#d8e2ea', marginBottom: 6 }
});
