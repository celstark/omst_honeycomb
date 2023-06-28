//imports here
import { ts1_1_1 } from "./jsOrders/cMST_Imbal2_orders_1_1_1";
import { ts1_2_1 } from "./jsOrders/cMST_Imbal2_orders_1_2_1";
import { ts2_1_1 } from "./jsOrders/cMST_Imbal2_orders_2_1_1";
import { ts2_2_1 } from "./jsOrders/cMST_Imbal2_orders_2_2_1";
import { ts3_1_1 } from "./jsOrders/cMST_Imbal2_orders_3_1_1";
import { ts3_2_1 } from "./jsOrders/cMST_Imbal2_orders_3_2_1";
import { ts4_1_1 } from "./jsOrders/cMST_Imbal2_orders_4_1_1";
import { ts4_2_1 } from "./jsOrders/cMST_Imbal2_orders_4_2_1";
import { ts5_1_1 } from "./jsOrders/cMST_Imbal2_orders_5_1_1";
import { ts5_2_1 } from "./jsOrders/cMST_Imbal2_orders_5_2_1";
import { ts6_1_1 } from "./jsOrders/cMST_Imbal2_orders_6_1_1";
import { ts6_2_1 } from "./jsOrders/cMST_Imbal2_orders_6_2_1";

var stim_set = '1';

var trialorder = '1';

var run = '1';

var twochoice = '0';

var selfpaced = '1';

var orderprefix = './jsOrders/cMST_Imbal2_orders_';

//set orderfile
var orderfile = orderprefix+stim_set+'_'+trialorder+'_'+run; // took off '.js'

var trial_stim;

// load trial_stim depending on selected orderfile
if (orderfile == './jsOrders/cMST_Imbal2_orders_1_1_1') {
    trial_stim = ts1_1_1; 
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_1_2_1") {
    trial_stim = ts1_2_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_2_1_1") {
    trial_stim = ts2_1_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_2_2_1") {
    trial_stim = ts2_2_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_3_1_1") {
    trial_stim = ts3_1_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_3_2_1") {
    trial_stim = ts3_2_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_4_1_1") {
    trial_stim = ts4_1_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_4_2_1") {
    trial_stim = ts4_2_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_5_1_1") {
    trial_stim = ts5_1_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_5_2_1") {
    trial_stim = ts5_2_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_6_1_1") {
    trial_stim = ts6_1_1;
}
else if (orderfile == "./jsOrders/cMST_Imbal2_orders_6_2_1") {
    trial_stim = ts6_2_1;
}

export { 
    stim_set,
    twochoice, 
    selfpaced, 
    orderfile,
    trial_stim
    };
