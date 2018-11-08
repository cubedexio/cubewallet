<template>
  <div id="deposit">
    <view-box>
      <x-header id="c-header" class="header-content-sm" :left-options="{backText:''}">{{ $t('Deposit') }}</x-header>
      <div class="content">
        <br>
        <h3 class="text-center">{{$t('Exchange ₵EOS With Your EOS')}}</h3>
        <br>
        <flexbox>
          <flexbox-item :span="8">
            {{$t('Usable Balance')}}
          </flexbox-item>
          <flexbox-item class="text-right" :span="4">
            {{balance}}
          </flexbox-item>
        </flexbox>
        <x-input type='number' :placeholder="$t('Please Enter Deposit Amount')" v-model="transferAmount" class="input-black"
                 name="transferAmount"></x-input>
        <br>
        <x-button type="primary" @click.native="confirm">{{$t('Confirm')}}</x-button>
      </div>
      <!--<div class="content">-->
        <!--<br>-->
        <!--<flexbox :gutter="0" class="">-->
          <!--<flexbox-item :span="8">-->
            <!--<span>{{$t('Deposit Eos')}}</span>-->
          <!--</flexbox-item>-->
          <!--<flexbox-item :span="4">-->
            <!--<span class="eos-icon" slot>-->
              <!--<img src="@/assets/images/Eos_logo.png" alt="">-->
            <!--</span>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
        <!--<div class="account-box">-->
          <!--<br>-->
          <!--<p class="text-center">-->
            <!--<qrcode class="qrcode" :value="account"></qrcode>-->
          <!--</p>-->
          <!--<br>-->
          <!--<flexbox :gutter="0" class="account">-->
            <!--<flexbox-item :span="7">-->
              <!--<span>{{$t('Deposit Account')}}</span>-->
              <!--<b>{{account}}</b>-->
              <!--<x-button type="primary" @click.native="doCody(account)">{{$t('Copy')}}</x-button>-->
            <!--</flexbox-item>-->
            <!--<flexbox-item :span="1"></flexbox-item>-->
            <!--<flexbox-item :span="4">-->
              <!--<span>memo</span>-->
              <!--<b>{{memo}}</b>-->
              <!--<x-button type="primary" @click.native="doCody(memo)">{{$t('Copy')}}</x-button>-->
            <!--</flexbox-item>-->
          <!--</flexbox>-->
        <!--</div>-->
      <!--</div>-->
    </view-box>
  </div>
</template>
<i18n>
Copy:
  zh-CN: 复制
Deposit Eos:
  zh-CN: 充值EOS
Deposit Account:
  zh-CN: 充值地址
Copy Success:
  zh-CN: 复制成功
Copy Fail:
  zh-CN: 复制失败
Exchange ₵EOS With Your EOS:
  zh-CN: 用你的EOS兑换等值的₵EOS
Usable Balance:
  zh-CN: 可用余额
Please Enter Deposit Amount:
  zh-CN: 请输入充值数量
Are you sure to exchange?:
  zh-CN: 你确定要充值吗？
</i18n>
<script>
import { setInterval, setTimeout } from 'timers';
import { mapState } from 'vuex'
import {Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs'
import { officialEosAccount, eosEndpoint } from '@/config'

  import {
    ViewBox,
    XHeader,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Qrcode,
    XButton,
    XInput
  }
  from 'vux'
  import CubeInput from '@/components/CubeInput'

  export default {
    name:'deposit',
    components:{
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      Qrcode,
      XButton,
      XInput
    },
    data(){
      return{
        account:'abc',
        memo:'321321',
        balance:0,
        transferAmount:'',
      }
    },
    computed: mapState([
        'privateKey',
        'eosAccountName'
    ]),
    mounted(){

        console.log(this.privateKey)
        console.log(this.eosAccountName)

        this.$store.commit('setEOSAccountName','alexchan1234')
        this.$store.commit('setPrivateKey','5KGCrSZXBw7d7nSAFDdDtywQL4KszPbmKAk2fGGySDZ1AUDggjW')


        console.log(this.privateKey)
        console.log(this.eosAccountName)

        this.getEOSBalance()
      this.$common.fixStatusBarByHeader('c-header')
      this.$common.fixTabBarByNav('c-nav-tab')

        
    },
    methods:{

        async eos2ceos() {

            this.$vux.loading.show({
                text: 'Processing..'
            })

            setTimeout(()=>{
                this.$vux.loading.hide()
            }, 20 * 1000)

            const rpc = new JsonRpc(eosEndpoint);
            const signatureProvider = new JsSignatureProvider([this.privateKey]);
            const api = new Api({ rpc, signatureProvider });


            let textContent = ''

                let quanity = (new Number(this.transferAmount)).toFixed(4) + ' EOS'
                try {
                    const result = await api.transact({
                        actions: [{
                            account: 'eosio.token',
                            name: 'transfer',
                            authorization: [{
                                actor: this.eosAccountName,
                                permission: 'active',
                            }],
                            data: {
                                from: this.eosAccountName,
                                to: officialEosAccount,
                                quantity: quanity,
                                memo: this.memo,
                            },
                        }]
                    }, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    });

                    this.$vux.loading.hide()
                    textContent += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);

                    if( result.transaction_id ) {
                        this.$vux.toast.show({
                            text:this.$t('Transaction completed'),
                            type:'text',
                            width:'16rem',
                            position:'middle'
                        })
                    }

                } catch (e) {
                    this.$vux.loading.hide()
                    textContent = '\nCaught exception: ' + e;
                    this.$vux.alert.show({
                        title: '兑换失败',
                        content: e.toString()
                    });

                    if (e instanceof RpcError)
                        textContent += '\n\n' + JSON.stringify(e.json, null, 2);
                }
                console.log(textContent)
                // alert(textContent)
            // }
        },


        getEOSBalance() {
            this.$http.post(`${eosEndpoint}/v1/chain/get_currency_balance`, {
                    account: this.eosAccountName,
                    code: 'eosio.token',
                    symbol: 'EOS'
            }).then(res=>{
                if( res.status === 200 && res.data.length > 0) {
                    this.balance =  res.data[0];
                }
            })

        },
      // doCody(text){
      //   this.$copyText(text).then(success=>{
      //     this.$vux.toast.show({
      //       text:this.$t('Copy Success'),
      //       type:'text',
      //       width:'16rem',
      //       position:'middle'
      //     })
      //     console.log(success)
      //   },fail=>{
      //     this.$vux.toast.show({
      //       text:this.$t('Copy Fail'),
      //       type:'text',
      //       width:'16rem',
      //       position:'middle'
      //     })
      //     console.log(fail)
      //   })
      // }
      confirm(){
        let that = this
        this.$vux.confirm.show({
          title:this.$t('Deposit'),
          content:this.$t('Are you sure to exchange?'),
          onCancel(){},
          onConfirm(){
            that.doDeposit()
          }
        })
      },
      doDeposit(){
        //充值操作
        if( this.memo == null ) {
            this.$vux.toast.show({
                text:this.$t('momo is null'),
                type:'text',
                width:'16rem',
                position:'middle'
            })
            return;
        }
        this.eos2ceos()
      }
    }
  }
</script>
