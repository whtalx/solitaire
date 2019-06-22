const menu = {
  categories: {
    game: {
      deal: {
        id: 0,
        type: 'menu-item',
        description: 'Deal a new game',
        function: 'deal',
        text: 'Deal F2',
      },

      break_first: {
        id: 1,
        type: 'break',
      },

      undo: {
        id: 2,
        type: 'menu-item',
        description: 'Undo last action',
        function: 'undo',
        text: 'Undo',
      },

      back: {
        id: 3,
        type: 'menu-item',
        description: 'Choose new deck back',
        function: 'back',
        text: 'Deck...',
      },

      options: {
        id: 4,
        type: 'menu-item',
        description: 'Change Solitaire options',
        function: 'options',
        text: 'Options...',
      },

      break_second: {
        id: 5,
        type: 'break',
      },

      exit: {
        id: 6,
        type: 'menu-item',
        description: 'Exit Solitaire',
        function: 'exit',
        text: 'Exit',
      },
    },

    help: {
      contents: {
        id: 0,
        type: 'menu-item',
        description: 'Index of Solitaire help topics',
        function: 'help',
        text: 'Contents F1',
      },

      search: {
        id: 1,
        type: 'menu-item',
        description: 'Search the Help Engine for a specific topic',
        function: 'help',
        text: 'Search for Help on...',
      },

      howTo: {
        id: 2,
        type: 'menu-item',
        description: 'Help using help',
        function: 'help',
        text: 'How to Use Help',
      },

      break_first: {
        id: 3,
        type: 'break',
      },

      statistics: {
        id: 4,
        type: 'menu-item',
        description: 'Game Statistics',
        function: 'statistics',
        text: 'Game Statistics',
      },
    },
  },

  hovered: null,
  isShowing: false,
};

export default menu;