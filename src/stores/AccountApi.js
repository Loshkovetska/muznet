import React from 'react'

import {
  makeAutoObservable,
  action,
  runInAction,
  observable,
  set,
  get,
} from 'mobx'
import { apiMocks } from '@/api/mock/apiMocks'

import { defineFivePopularArticle } from '@/components/helpers/defineFivePopularArticle'
import axios from 'axios'
import domain from '@/res/domain'
class AccountApi {
  contractorAccountDataApi = [
    {
      id: 1,
      userType: 'Contractor',
      contractorPosition: 'Manager',
      userNickName: 'Annie96',
      userName: 'Annie',
      userCurrencyType: 'JMD-$',
      userSurName: 'Smith',
      userAvatar: [require('../../assets/Mock/Georgia.png')],
      userDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      userEmail: 'user1@gmail.com',
      userPhoneNumber: '+1 000 753 6735',
      userLocation: 'Victoria, Ballarat',
      contractorAds: [
        {
          id: 8518582,
          adImage: [
            require('../../assets/Mock/vendors/vendor1.png'),
            require('../../assets/Mock/vendors/vendor2.png'),
            require('../../assets/Mock/vendors/vendor3.png'),
          ],
          userPricePerHour: 100,
          userCurrencyType: '$',
          adDescription:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ea commodo...',
          adDate: {
            milliseconds: 55800000,
            string: 'Wednesday, Jun 29',
          },
          eventStart: {
            milliseconds: 55800000,
            string: '03:30pm',
          },
          eventEnd: {
            milliseconds: 73800000,
            string: '06:30pm',
          },
          adTitle: 'Aloft Asheville',
          adLocation:
            '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
          coordinate: {
            latitude: 37.88068574665098,
            longitude: -122.2798887321131,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          },
          willingToTravel: true,
          adTypeOfMusician: 'Musician',
          adSkills: {
            singByEar: true,
            playByEar: true,
            readSheetMusic: false,
          },
          adGenres: ['Classical', 'Jazz', 'Pop'],
          adMusicalInstrument: ['Harp', 'Piano'],
          adReview: [
            {
              reviewDate: 1652541822755,
              reviewRate: 2,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer1.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652533322758,
              reviewRate: 5,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer2.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652573322758,
              reviewRate: 1,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer3.png'),
              reviewMessage:
                'He was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652533322758,
              reviewRate: 5,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer1.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652541822755,
              reviewRate: 4,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer2.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
          ],
        },

        {
          id: 1855674,
          adImage: [
            require('../../assets/Mock/vendors/vendor3.png'),
            require('../../assets/Mock/vendors/vendor1.png'),
            require('../../assets/Mock/vendors/vendor2.png'),
          ],
          userPricePerHour: 150,
          userCurrencyType: '$',
          adDescription:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ea commodo...',
          adDate: {
            milliseconds: 55800000,
            string: 'Wednesday, Jun 29',
          },
          eventStart: {
            milliseconds: 55800000,
            string: '03:30pm',
          },
          eventEnd: {
            string: '06:30pm',
            milliseconds: 73800000,
          },

          adTitle: 'Le Bernandin',
          adLocation:
            '1632 Spruce Street, Berkeley, CA 94709 Berkeley California United States',
          coordinate: {
            latitude: 37.87756939233716,
            longitude: -122.26555500713751,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          },
          willingToTravel: true,
          adTypeOfMusician: 'Band',
          adSkills: {
            singByEar: true,
            playByEar: true,
            readSheetMusic: true,
          },
          adGenres: ['Classical', 'Jazz', 'Pop'],
          adMusicalInstrument: ['Harp', 'Piano'],
          adReview: [
            {
              reviewDate: 1652541822755,
              reviewRate: 5,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer1.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652533322758,
              reviewRate: 5,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer2.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652573322758,
              reviewRate: 3,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer3.png'),
              reviewMessage:
                'He was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652533322758,
              reviewRate: 2,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer1.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
            {
              reviewDate: 1652541822755,
              reviewRate: 4,
              reviewWritter: 'Kelvin Pearson',
              reviewerAvatar: require('../../assets/Mock/reviewer/reviewer2.png'),
              reviewMessage:
                'What a fabulous night for my Dad’s birthday – everyone was so impressed, he was outstanding. Neil was professional, adaptable and sociable. I would recommend him 100%. Brilliant!',
            },
          ],
        },
      ],
      userNotification: {
        userNewReview: false,
        userNewOffer: true,
        userNewMessage: false,
        userNewProfileView: true,
        userLoginAtteptOnAccount: false,
        userTransaction: false,
      },
      userDeals: {
        activeDeals: [
          {
            dealId: 6516516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400002,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aenean nec fringilla sapien.',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6516444,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: true,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400000,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6556516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400000,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6516484,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: true,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1658307600000,
              string: 'Wednesday, Jun 20',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 7516516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1658566800000,
              string: 'Saturday, Jul 23',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
        ],
        closedDeals: [
          {
            dealId: 6716444,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: false,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 30',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6519516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: false,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 29',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Avenue Asheville',
            adLocation: 'Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6596516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: false,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 29',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
        ],
      },
    },
  ]
  musicianAccountDataApi = [
    {
      userType: 'Musician',
      userMusicianType: 'Musician',
      userNickName: 'Leo96',
      userName: 'Leo',
      userSurName: 'Balamut',
      userAvatar: [
        require('../../assets/Mock/Leo.png'),
        require('../../assets/Mock/Kate1.jpg'),
        require('../../assets/Mock/Blaze.png'),
        require('../../assets/Mock/Kate3.jpg'),
      ],
      userDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      userEmail: 'user1@gmail.com',
      userLocation: 'Victoria, Ballarat',
      userAddress: '40 Lydiard St N',
      userPhoneNumber: '+1 000 753 6735',
      userGenres: ['Classical', 'Jazz', 'Pop'],
      userMusicalInstrument: ['Harp', 'Piano'],
      userPricePerHour: 100,
      userCurrencyType: 'JMD-$',
      willingToTravel: true,
      userSkills: {
        singByEar: true,
        playByEar: false,
        readSheetMusic: true,
      },
      userNotification: {
        userNewReview: false,
        userNewOffer: true,
        userNewMessage: false,
        userNewProfileView: true,
        userLoginAtteptOnAccount: false,
        userTransaction: false,
      },
      userDeals: {
        activeDeals: [
          {
            dealId: 6516516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400000,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aenean nec fringilla sapien.',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6516444,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: true,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400000,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6556516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1657616400000,
              string: 'Thursday, Jul 12',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6516484,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: true,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1658307600000,
              string: 'Wednesday, Jun 20',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 7516516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: true,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 1658566800000,
              string: 'Saturday, Jul 23',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
        ],
        closedDeals: [
          {
            dealId: 6716444,
            dealUserName: 'Robert Osborne',
            dealNumber: 1247,
            dealStatus: false,
            userPricePerHour: 60,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 30',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6519516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: false,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 29',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Avenue Asheville',
            adLocation: 'Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
          {
            dealId: 6596516,
            dealUserName: 'Robert Osborne',
            dealNumber: 1246,
            dealStatus: false,
            userPricePerHour: 30,
            userCurrencyType: '$',
            adDate: {
              milliseconds: 55800000,
              string: 'Wednesday, Jun 29',
            },
            eventStart: {
              milliseconds: 55800000,
              string: '03:30pm',
            },
            eventEnd: {
              milliseconds: 73800000,
              string: '06:30pm',
            },
            adTitle: 'Aloft Asheville',
            adLocation:
              '1347 McGee Avenue, Berkeley, CA 94703 Berkeley California United States',
            dealPhoneNumber: '+1 000 753 6735',
            paymentMethod: 'Dbs Bank Ltd',
            perfomanceCost: 90,
            muznetFee: 9,
            totalPrice: 99,
            moreDetails:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec fringilla sapien. Proin at porta massa. Pellentesque in lorem sapien. Aliquam a quam vitae quam pharetra laoreet. Lorem ipsum dolor sit amet',
          },
        ],
      },
    },
  ]

  popularFaqVendorArticle = []
  popularFaqMusicianArticle = []

  faqVendorArticle = []
  faqMusicianArticle = []

  faqVendorAllArticles = []
  faqMusicianAllArticles = []

  isOpenPersonalInfoTab = false
  isOpenPaymentTab = false
  isOpenChangePasswordTab = false
  isOpenNotificationTab = false
  isOpenMyAdsTab = false
  isOpenEditAd = false
  adIdForEdit = 0
  isOpenCreateAd = false
  isOpenTermOfServiceTab = false
  isOpenPrivacy = false
  isOpenLicense = false

  isOpenFaqTab = false

  constructor() {
    makeAutoObservable(this, {
      contractorAccountDataApi: observable,
      musicianAccountDataApi: observable,
      popularFaqVendorArticle: observable,
      popularFaqMusicianArticle: observable,

      userNotification: observable,

      isOpenPersonalInfoTab: observable,
      isOpenPaymentTab: observable,
      isOpenChangePasswordTab: observable,
      isOpenNotificationTab: observable,
      isOpenMyAdsTab: observable,
      isOpenEditAd: observable,
      adIdForEdit: observable,
      isOpenCreateAd: observable,
      isOpenTermOfServiceTab: observable,
      isOpenPrivacy: observable,
      isOpenLicense: observable,

      isOpenFaqTab: observable,

      setOpenTabs: action.bound,
      setCloseAllTabs: action.bound,
      setAdIdForEdit: action.bound,
      setEditedAd: action.bound,
      setNewAd: action.bound,
      changeContactorAccountData: action.bound,
      setFaqArticles: action.bound,
      setFaqArticles: action.bound,
      submitDeal: action.bound,
    })
  }

  changeContactorAccountData({ updatedData, id }) {
    //set(contractorAccountDataApi, "userName", updatedData.userName);
  }

  setOpenTabs({ tabName, isOpen }) {
    const action = isOpen
    switch (tabName) {
      case 'Personal Info':
        this.isOpenPersonalInfoTab = action
        break

      case 'Payments and Payouts':
        this.isOpenPaymentTab = action
        break

      case 'Change Password':
        this.isOpenChangePasswordTab = action
        break

      case 'Notification':
        this.isOpenNotificationTab = action
        break

      case 'My Ads':
        this.isOpenMyAdsTab = action
        break

      case 'Edit ad':
        this.isOpenEditAd = action
        break

      case 'Create ad':
        this.isOpenCreateAd = action
        break

      case 'Terms of Service':
        this.isOpenTermOfServiceTab = action
        break
      case 'Privacy Policy':
        this.isOpenPrivacy = action
        break
      case 'End User License Agreement':
        this.isOpenLicense = action
        break
      case 'FAQ':
        this.isOpenFaqTab = action
        break

      default:
        return
    }
  }
  setCloseAllTabs() {
    this.isOpenPersonalInfoTab = false
    this.isOpenPaymentTab = false
    this.isOpenChangePasswordTab = false
    this.isOpenNotificationTab = false
    this.isOpenMyAdsTab = false
    this.isOpenEditAd = false
    this.isOpenCreateAd = false
    this.isOpenTermOfServiceTab = false
    this.isOpenPrivacy = false
    this.isOpenLicense = false
    this.isOpenFaqTab = false
  }

  setAdIdForEdit(id) {
    this.adIdForEdit = id
  }
  setEditedAd(editedAd) {
    let editedIndex
    apiMocks.ContractorAdsMockApi.find((item, id) => {
      if (item.id === editedAd.id) {
        editedIndex = id
      }
    })
    apiMocks.ContractorAdsMockApi[editedIndex] = editedAd

    let editedStoreIndex
    this.contractorAccountDataApi[0].contractorAds.find((item, id) => {
      if (item.id === editedAd.id) {
        return (editedStoreIndex = id)
      }
      return
    })
    this.contractorAccountDataApi[0].contractorAds[editedStoreIndex] = editedAd
  }

  setNewAd(newAd) {
    apiMocks.ContractorAdsMockApi.unshift(newAd)
    set(this.contractorAccountDataApi[0], 'contractorAds', [
      newAd,
      ...this.contractorAccountDataApi[0].contractorAds,
    ])
  }

  setFaqArticles() {
    axios.get(`${domain}faq`).then((res) => {
      const vendorFaqData = defineFivePopularArticle({
        faqData: res.data.vendorFaq || [],
      })
      const musicianFaqData = defineFivePopularArticle({
        faqData: res.data.musicianFaq || [],
      })

      const allVendorFaqArticle = defineFivePopularArticle({
        faqData: res.data.vendorFaq || [],
        isReturnAll: true,
      })
      const allMusicianFaqArticle = defineFivePopularArticle({
        faqData: res.data.musicianFaq || [],
        isReturnAll: true,
      })

      runInAction(() => {
        this.popularFaqVendorArticle = vendorFaqData
        this.popularFaqMusicianArticle = musicianFaqData
        this.faqVendorArticle = res.data.vendorFaq
        this.faqMusicianArticle = res.data.musicianFaq
        this.faqVendorAllArticles = allVendorFaqArticle
        this.faqMusicianAllArticles = allMusicianFaqArticle
      })
    })
  }

  submitDeal(submitDeal, isContractor) {
    const currentDealData = isContractor
      ? this.contractorAccountDataApi[0].userDeals
      : this.musicianAccountDataApi[0].userDeals
    // Remove from active
    const filtered = currentDealData.activeDeals.filter((item, id) => {
      return item.dealId !== submitDeal.dealId
    })
    set(currentDealData, 'activeDeals', filtered)

    // Set to disable
    submitDeal.dealStatus = false
    set(currentDealData, 'closedDeals', [
      submitDeal,
      ...currentDealData.closedDeals,
    ])
  }
}

const AccountApiStore = new AccountApi()

export const AccountApiStoreContext = React.createContext(AccountApiStore)
export const useAccountApiStore = () => React.useContext(AccountApiStoreContext)
