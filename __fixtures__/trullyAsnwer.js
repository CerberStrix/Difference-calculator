const trullyMass = [
  {
    type: 'recursion',
    key: 'common',
    children: [
      {
        type: 'added',
        key: 'follow',
        val: false,
      },
      {
        type: 'same',
        key: 'setting1',
        val: 'Value 1',
      },
      {
        type: 'removed',
        key: 'setting2',
        val: 200,
      },
      {
        type: 'updated',
        key: 'setting3',
        val1: true,
        val2: null,
      },
      {
        type: 'added',
        key: 'setting4',
        val: 'blah blah',
      },
      {
        type: 'added',
        key: 'setting5',
        val: {
          key5: 'value5',
        },
      },
      {
        type: 'recursion',
        key: 'setting6',
        children: [
          {
            type: 'recursion',
            key: 'doge',
            children: [
              {
                type: 'updated',
                key: 'wow',
                val1: '',
                val2: 'so much',
              },
            ],
          },
          {
            type: 'same',
            key: 'key',
            val: 'value',
          },
          {
            type: 'added',
            key: 'ops',
            val: 'vops',
          },
        ],
      },
    ],
  },
  {
    type: 'recursion',
    key: 'group1',
    children: [
      {
        type: 'updated',
        key: 'baz',
        val1: 'bas',
        val2: 'bars',
      },
      {
        type: 'same',
        key: 'foo',
        val: 'bar',
      },
      {
        type: 'updated',
        key: 'nest',
        val1: {
          key: 'value',
        },
        val2: 'str',
      },
    ],
  },
  {
    type: 'removed',
    key: 'group2',
    val: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    type: 'added',
    key: 'group3',
    val: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

export default trullyMass;
