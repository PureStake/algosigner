module.exports = {
  wallet: {
    password: 'c5brJp5f',
  },
  extension: {
    name: 'AlgoSigner',
    html: 'index.html',
  },
  accounts: {
    ui: {
      name: 'E2E-Tests',
      mnemonic:
        'belt middle party tired craft blanket guide want perfect taste couch march goddess render orient chair avocado intact other stand route attend number abandon icon',
      address: 'SGQOSQKZQWABMLHY6CPLKFZ4FHURBLVQTMZZQFP4U7LGZHPW3U4MIPXEDU',
    },
    multisig: {
      name: 'Joined Multisig',
      address: 'DZ7POUYOOYW4PEKD3LZE7ZZTBT5JGIYZ3M7VECEPZ2HLHE7RGTGJIORBCI',
      subaccounts: [
        {
          name: 'Multisig 1',
          mnemonic:
            'response faculty obtain crowd dismiss cool clean breeze clinic pulp flash faculty worth mention layer rare reduce hand width crowd near hawk goddess about sail',
          address: 'LKBQQZQ7LQFNO5477GRPMY6UOGVJJOIN7WSIPY7YQIRAHKXVYQVT6EXOGY',
        },
        {
          name: 'Multisig 2',
          mnemonic:
            'obscure obscure allow drink write country merry ahead ordinary gallery reunion start roof antique orchard chicken shy write rebuild infant bone segment material above treat',
          address: '2SLXGKWLIGSDDLC7RZY7DMGCXOAWMT6GAGO3AJM22T6Q4ZGYTNQHSOLSWA',
        },
        {
          name: 'Multisig 3',
          mnemonic:
            'silent cram muffin differ poet spoon two bench tray inmate ribbon slogan vacuum area amateur thought obvious arena kiwi turkey seminar flush consider abstract monster',
          address: 'KQVFM6F6ZNPO76XGPNG7QT5E5UJK62ZFICFMMH3HI4GNWYZD5RFHGAJSPQ',
        },
      ],
    },
  },
};
