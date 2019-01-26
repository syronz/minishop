(function(){
	var dic = function($http){

		var w = {
			hello : {ar:'سلام',ku:'سلاو',en:'Hello'},
			bye : {ar:'مع الخیر',ku:'خواحافیز',en:'Bye'},
			rent : {ar:'للایجار',ku:'کرێ',en:'Rent'},
			sell : {ar:'',ku:'فرۆش',en:'Sell'},
			about : {ar:'اتصال',ku:'دەربارە',en:'About'},
			contact : {ar:'للایجار',ku:'پەیوەندی',en:'Contact'},
			home : {ar:'اول',ku:'سەرەکی',en:'Home'},
			technology_improve : {ar:'dd',ku:'گرنگی به‌شدارییكردن له‌م ',en:'Technology Improve'},
			our_work : {ar:'ff',ku:'وێب سایته‌ له‌ چیدایه‌؟',en:' Our Work'},
			explain_about : {ar:'gg',ku:"ئەم پرۆگرامە تایبەتە بۆ فرۆشگای کاک نەبەرد هەر بەکار هێنانێک غەیری ئەم فرۆشگایە هیچ گارانتیەک ناگرێتە ئەستۆ",en:'this program designed for Nabard\'s Shop, any use of this program excepty that shop illegal and have not any guarantee'},
			address : {ar:'',ku:'ناونیشان: ',en:'Address:'},
			phone : {ar:'',ku:'تەلەفون: ',en:'Phone:'},
			phoneExplain : {ar:'',ku:'پرۆگرامێر: دیاکۆ ئەمیر 07505149171 ',en:'Programer: Diako Amir [07505149171]'},
			guarantee : {ar:'',ku:'ساپۆرت و گەرەنتی',en:'Guarantee'},
			guaranteeExplain : {ar:'',ku:'ئەم پرۆگرامە گەرەنتی هەتاهەتایی لە پشتە بۆ هەر خێلەلێک و تا ماوەی یەک مانگیش ساپۆرتی بەلاشی لەسەرە بۆ هەر پێداویستی یان فێرکاری تایبەت',en:'Diako Amir guarantee this program forever, and also we have free service for this program until end of first 30 days.'},
			aboutUs : {ar:'',ku:'دەربارەی ئێمە',en:'About Us'},
			aboutUsExplain : {ar:'',ku:'پرۆگرامێری ئەم ئەپلیکەیشەنە دیاکۆ ئەمیر لە سالانی 2005 دەستی کردۆ بە پرۆگرام سازی و ئەم پرۆگرامە نەتیجەی 12 سال تەجروبەی پرۆگرام سازیە. ئەم پرۆگرامە وێب بەیسە و ئەکرێ وەک سێرڤەر هەلسوکەوتی لەگەل بکرێ، یانی پەیوەست کرێ لە چەندین کۆمپیتەری ترەوە لە رێگای نیتوۆرک',en:''},
			socialNetworks : {ar:'',ku:'',en:'socialNetworks'},
			login : {ar:'',ku:'',en:'Login'},
			pleaseSignIn : {ar:'',ku:'',en:'Please sign in'},
			password : {ar:'',ku:'',en:'Password'},
			signIn : {ar:'',ku:'داخل بوون',en:'Sign in'},
			rememberMe : {ar:'',ku:'',en:'Remember me'},
			adminPart : {ar:'',ku:'',en:'Admin Part'},
			search : {ar:'بحث',ku:'گەران',en:'Search'},
			add : {ar:'',ku:'زیاد کردن',en:'Add'},
			list : {ar:'',ku:'لیست',en:'List'},
			other : {ar:'',ku:'',en:'Other'},
			priceDollar : {ar:'',ku:'',en:'Price $'},
			priceDinar : {ar:'',ku:'',en:'Price IQD'},
			bedroom : {ar:'',ku:'',en:'Bedroom'},
			moreThan6 : {ar:'',ku:'',en:'More Than 6'},
			addressKurdish : {ar:'',ku:'',en:'Address Kurdish'},
			addressEnglish : {ar:'',ku:'',en:'Address English'},
			addressArabic : {ar:'',ku:'',en:'Address Arabic'},
			descriptionKurdish : {ar:'',ku:'',en:'Description Kurdish'},
			descriptionEnglish : {ar:'',ku:'',en:'Description English'},
			descriptionArabic : {ar:'',ku:'',en:'Description Arabic'},
			hashtag : {ar:'',ku:'',en:'Hashtag'},
			gps : {ar:'',ku:'',en:'GPS'},
			detail : {ar:'',ku:'',en:'Detail'},
			property : {ar:'',ku:'تایبەتمەندی',en:'Property'},
			house : {ar:'مال',ku:'خانو',en:'House'},
			flats : {ar:'شوقە',ku:'شوقە',en:'Flats'},
			shop : {ar:'دوکان',ku:'دوکان',en:'Shop'},
			farmOrLand : {ar:'زەوی',ku:'زەوی',en:'Farm or Land'},
			quarter : {ar:'المنطقة',ku:'گەرەک',en:'Quarter'},
			addNewProperty : {ar:'',ku:'',en:'Add New Property'},
			area : {ar:'مساحة',ku:'ڕووبەر',en:'Area'},
			id:{ar:'',ku:'',en:'id'},
			id_real_estate:{ar:'',ku:'',en:'id_real_estate'},
			id_user:{ar:'',ku:'',en:'id_user'},
			city:{ar:'',ku:'',en:'city'},
			address_k:{ar:'',ku:'',en:'address_k'},
			address_e:{ar:'',ku:'',en:'address_e'},
			address_a:{ar:'',ku:'',en:'address_a'},
			property_type:{ar:'',ku:'',en:'property_type'},
			type:{ar:'نوع',ku:'جۆر',en:'type'},
			phone:{ar:'',ku:'',en:'phone'},
			bedroom:{ar:'',ku:'ژوری نوستن',en:'bedroom'},
			bath:{ar:'',ku:'',en:'bath'},
			dinning_room:{ar:'',ku:'',en:'dinning_room'},
			hashtag:{ar:'',ku:'',en:'hashtag'},
			date2:{ar:'',ku:'',en:'date2'},
			description_k:{ar:'',ku:'',en:'description_k'},
			state:{ar:'',ku:'',en:'state'},
			description_e:{ar:'',ku:'',en:'description_e'},
			description_a:{ar:'',ku:'',en:'description_a'},
			detail:{ar:'',ku:'',en:'detail'},
			gps:{ar:'',ku:'',en:'gps'},
			price_dollar:{ar:'',ku:'',en:'price_dollar'},
			price_dinar:{ar:'',ku:'',en:'price_dinar'},
			delete : {ar:'',ku:'سرینەوە',en:'delete'},
			all : {ar:'کل',ku:'هەمو',en:'All'},
			max_Price : {ar:'السعر الغلي',ku:'زیاترین نرخ',en:'Max Price'},
			min_Bedroom : {ar:'',ku:'کەمترین ژوری نوستن',en:'Min Bedroom'},
			max_Bedroom : {ar:'',ku:'زیارتین ژوری نوستن',en:'Max Bedroom'},
			unlimit : {ar:'',ku:'بێ سنوور',en:'unlimit'},
			cancel : {ar:'الغی',ku:'هەڵ دەوەشێنێتەوە',en:'Cancel'},
			submit : {ar:'عرض',ku:'پێشكەش دەكات',en:'Submit'},
			photos : {ar:'',ku:'وێنەکان',en:'Photos'},
			to : {ar:'',ku:'بۆ',en:'to'},
			moreDetail : {ar:'',ku:'',en:'more detail'},
			callNow : {ar:'',ku:'تەلەفون بکە',en:'Call Now'},
			sort : {ar:'',ku:'پۆلێن',en:'Sort'},
			DateRecent : {ar:'',ku:'بەروار: نوێترین',en:'Date: Recent'},
			DateOldest : {ar:'',ku:'بەروار: کۆنترین',en:'Date: Oldest'},
			PriceHighest : {ar:'',ku:'نرخ: زۆرترین',en:'Price: Highest'},
			PriceLowest : {ar:'',ku:'نرخ: کەمترین',en:'Price: Lowest'},
			edit : {ar:'',ku:'',en:'edit'},
			mall : {ar:'مال',ku:'مۆڵ',en:'Mall'},

			//-------------------------------------------------------*********** new
			//-------------------------------------------------------*********** new
			//-------------------------------------------------------*********** new
			//-------------------------------------------------------*********** new
			dashboard : {ar:'',ku:'دەستپێک',en:'Dashboard'},
			stuffCategory : {ar:'',ku:'جۆری بەرهەم',en:'Stuff Category'},
			manageStuffCategoryExplain : {ar:'',ku:'ئیدارەکردنی جۆری بەرهەمەکان',en:'Manage (add,edit,delete) category of stuff, usefull in reports'},
			stuff : {ar:'',ku:'بەرهەم',en:'Stuff'},
			stuffExlain : {ar:'',ku:'کۆنترۆلکردنی بەرهەمەکان بە گشتی',en:'Manage (add,edit,delete) All Stuffs'},
			invoice : {ar:'',ku:'رسید',en:'Invoice'},
			invoiceExplain : {ar:'',ku:'دروست کردنی فارۆرەی تازە',en:'Create New Invoice'},
			setting : {ar:'',ku:'رێکخستن',en:'Setting'},
			settingExplain : {ar:'',ku:'کۆنترۆلی ئیجازەکان، زیاد کردنی یوزەر، بەکئۆپ لێرەدا دەکردرێت',en:'Manage Permissions and users also backup and restore'},
			fund : {ar:'',ku:'سندوق',en:'Fund'},
			fundExplain : {ar:'',ku:'چاودێری بە سەر سندوق بۆ زانیاری سەبارەت با هاتوچۆی پارە (وەرگرتنی پارە و خەرجێکان)',en:'To observation Cash and all payin and payouts'},
			expense : {ar:'',ku:'خەرجی',en:'Expense'},
			expenseExplain : {ar:'',ku:'چاودێری تەواوی خەرجێکان و داخل کردنی خەرجی تازە',en:'Observation all expense and record neww expense'},
			report : {ar:'',ku:'راپۆرت',en:'Report'},
			sellDayReport : {ar:'',ku:'راپۆرتئ فرۆشی رۆژانە',en:'Sell Day Report'},
			sellDayReportExplain : {ar:'',ku:'فرۆشی رۆژانە بە پێی بەروار لێرەدا دابیندرێت',en:'Sell report by day viewed in this part'},
			exit : {ar:'',ku:'دەرچون',en:'Exit'},
			exitExplain : {ar:'',ku:'تکایە دوای تەواو بونی کارەکەتان دەرچن',en:'After Finish your work please logout'},
			categoryList : {ar:'',ku:'لیستی جۆرەکان',en:'Category List'},
			print : {ar:'',ku:'چاپ',en:'Print'},
			Edit : {ar:'',ku:'گۆرانکاری',en:'Edit'},
			Save : {ar:'',ku:'خەزن',en:'Save'},
			Delete : {ar:'',ku:'سرین',en:'Delete'},
			addNew : {ar:'',ku:'زیاد کردن',en:'Add New'},
			You_Havent_Permission : {ar:'',ku:'ئیجازەت نێت',en:'You Havent Permission'},
			false : {ar:'',ku:'',en:''},
			Your_Information_Not_Exist : {ar:'',ku:'دێیتا نیەت',en:'Table is empty'},
			category : {ar:'',ku:'جۆر',en:'Category'},
			name : {ar:'',ku:'ناو',en:'Name'},
			barcode : {ar:'',ku:'بارکۆد',en:'Barcode'},
			qty : {ar:'',ku:'عەدەد',en:'Qty'},
			price : {ar:'',ku:'نرخ',en:'Price'},
			detail : {ar:'',ku:'تێبینی',en:'Detail'},
			stuffList : {ar:'',ku:'لیستی بەرهەمەکان',en:'Stuff List'},
			Add : {ar:'',ku:'نوێ',en:'Add'},
			permission : {ar:'',ku:'ئیجازەکان',en:'Permission'},
			language : {ar:'',ku:'زمان',en:'Language'},
			password : {ar:'',ku:'پەسوۆرد',en:'Password'},
			username : {ar:'',ku:'یوزەرنەیم',en:'Username'},
			actions : {ar:'',ku:'کارەکان',en:'Actions'},
			id : {ar:'',ku:'ژ',en:'ID'},
			userList : {ar:'',ku:'لیستی یوزەرەکان',en:'User List'},
			backup : {ar:'',ku:'بەکئۆپ',en:'Backup'},
			user : {ar:'',ku:'بەکارهێنەر',en:'User'},
			userPartTip : {ar:'',ku:'لەم بەشە دا دەتوانێن یوزەر زیاد بکەن بۆ پرۆگرامەکە. ئاگادار بن کە دەبێت زمانی تایبەت بە یوزەر هەلبژێرن دەنا ئێرۆر دەدات اگار بە هەر جار گۆرین پاسسوۆرد رێسێت دەبێتەوە',en:'In this Part you can manage users, every time you edit a user need to select language. if not you get error also if you have blank for password the pass will reset'},
			totalPrice : {ar:'',ku:'کۆ',en:'Total.P'},
			addItem : {ar:'',ku:'زیاد کردنی ڕیز',en:'Add Item'},
			phoneNumber : {ar:'',ku:'مۆبایل',en:'Phone Number'},
			customer : {ar:'',ku:'کریار',en:'Customer'},
			subTotal : {ar:'',ku:'کۆی گشتی',en:'Sub Total'},
			discount : {ar:'',ku:'داشکاندن',en:'Discount(%):'},
			grandTotal: {ar:'',ku:'کۆی گشتی نهایی',en:'Grand Total:'},
			invoicePartTip : {ar:'',ku:'لەم بەشە دا دەتوانن رسیدی نوێ دروست بکەن هەروەها لیستی تەواوی رسیدەکانی تر دەبینن. دروست کردنی رسید دەتوانرێ لە رێگای بارکۆد یان هەلبژاردن ئەنجام بدرێت',en:'In this part you can Create new Invoice also print list of all invoices'},
			reportList : {ar:'',ku:'لیستی رێپۆرتەکان',en:'Report List'},
			reportPartTip : {ar:'',ku:'لەم بەشە دا راپۆرتی فرۆش بە پێی رۆژ دەبینین.',en:'in this part you can see sell report by day. this info automaticaly created and we dont consider discount for report'},
			totalQty : {ar:'',ku:'کۆی عەدەد',en:'Total Qty'},
			totalSell : {ar:'',ku:'کۆی فرۆش',en:'Total Sell'},
			date:{ar:'',ku:'بەروار',en:'date'},
			sellMonthReport : {ar:'',ku:'راپۆرتئ فرۆشی مانگانە',en:'Sell Month Report'},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},
			m : {ar:'',ku:'',en:''},



		}

		return {
			w : w
		};
	};
	var module = angular.module('diakoApp');
	module.factory("dic",dic);
}());

