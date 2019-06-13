export default function saveHistory(state, ...args) {
  let history = {};
  args.forEach(item => {
    switch (item) {
      case 'waste':
      case 'deck':
        history[item] = [...state.cards[item]];
        break;
        
      case 'foundation':
      case 'tableau':
        history[item] = state.cards[item].map((parentItem) => {
          return parentItem.map((childItem) => {
            return { ...childItem };
          });
        });
        break;
    
      default:
        break;
    }
  });

  return history;
}
