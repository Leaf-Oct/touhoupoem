function init() {
	$("#begin").show();
}
// 全局变量,故事线
window.storyLine = -1;
//答题开始前的剧情. 任务名字和文案
var names = ["八云 紫(やくも ゆかり)", "八云 紫", "八云 紫", "八云 紫", "", "幽幽子", "八云 紫", "幽幽子", "八云 紫", "八云 紫", "幽幽子", "八云 紫", "幽幽子", "八云 紫", "幽幽子"];
var contents = ["我,八云紫, 是一个隙间妖怪. 我和西行寺幽幽子(さいぎょうじ　ゆゆこ)是有几百年交情的朋友了", "今天我像往常一样，到幽幽子的府上——白玉楼拜访", "走过庭院, 问候正在练剑的庭师魂魄妖梦, 然后直往书房走去", "见到她后, 我更加确定,  这个作品不只是简单的galgame.", "......", "啊啦, 紫", "在写诗吗？今天怎么有这雅致~", "诗可以兴，可以观，可以群，可以怨。有时还是需要借诗《怀古》的", "你若赋过明堂, 何必曾去叹那越中鹧鸪.", "你曾醉听萧鼓, 为何忧虑今宵酒醒何处?", "不愧是紫呢~诗词歌赋信手拈来", "毕竟一千多年前, 我也是去过大唐 大宋的", "陪我吟诗几句吧, 顺便展示下我练的书法", "乐意之至~", "客路青山外~"]
//答题开始前的剧情. 图片和文案的切换
function changeDialog() {
	storyLine++;
	switch (storyLine) {
		case 2:
			var bg = $("#game");
			bg.css("background-color", "transparent");
			bg.css("background-image", "url('./res/白玉楼（求闻史纪）.jpg')");
			break;
		case 4:
			var bg = $("#game");
			bg.css("background-image", "url('./res/写字.jpg')");
			$("#left_lihui").attr("src", "");
			break;
		case 5:
			$("#right_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）惑.png");
			break;
		case 6:
			$("#right_lihui").attr("src", "");
			$("#left_lihui").attr("src", "./res/八云紫（萃梦想立绘）余.png");
			break;
		case 7:
			$("#left_lihui").attr("src", "");
			$("#right_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）余.png");
			break;
		case 8:
			$("#game").css("background-image", "url(./res/FQiDJlmVsAEs_tF.jpg)");
			$("#right_lihui").attr("src", "");
			$("#left_lihui").attr("src", "./res/八云紫（萃梦想立绘）怒.png");
			break;
		case 10:
			$("#left_lihui").attr("src", "");
			$("#right_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）嬉.png");
			break;
		case 11:
			$("#right_lihui").attr("src", "");
			$("#left_lihui").attr("src", "./res/八云紫（萃梦想立绘）嬉.png");
			break;
		case 12:
			$("#left_lihui").attr("src", "");
			$("#right_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）余.png");
			break;
		case 13:
			$("#right_lihui").attr("src", "");
			$("#left_lihui").attr("src", "./res/八云紫（萃梦想立绘）決.png");
			break;
		case 14:
			$("#game").css("background-image", "url(./res/书房.png)");
			$("#left_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）決.png");
			$("#choice_frame").show();
			var dia = $("#dialog");
			dia.removeAttr("onclick");
			dia.css("cursor", "default");
			$("#BGM").attr("src", "./sound/冷吟閑酔.mp3");
			break;
	}
	var characterName = $("#char_name");
	var dialogContent = $("#char_content");
	characterName.html(names[storyLine]);
	dialogContent.html(contents[storyLine]);
}
//几条线的分数记录, 用于决定最后题什么字
window.score = 0;
window.rap = 0;
window.head = 0;
window.japan = 0;
window.question_order = 0;
//做出第一个选择后走的分支
function buttonInit(choose) {
	$("#IC").html("");
	$("#IIC").html("");
	$("#IIIC").html("");
	$("#IVC").html("");
	switch (choose) {
		//接头霸王 线
		case 1:
			$("#IC").attr("onclick", "headChange(0)");
			$("#IIC").attr("onclick", "headChange(1)");
			$("#IIIC").attr("onclick", "headChange(2)");
			$("#IVC").attr("onclick", "headChange(3)");
			headChange(choose);
			break;
		//全对或全错线
		case 4:
		case 2:
			$("#IC").attr("onclick", "norChange(0)");
			$("#IIC").attr("onclick", "norChange(1)");
			$("#IIIC").attr("onclick", "norChange(2)");
			$("#IVC").attr("onclick", "norChange(3)");
			norChange(choose);
			break;
		//rapper线
		case 3:
			$("#IC").attr("onclick", "rapChange(0)");
			$("#IIC").attr("onclick", "rapChange(1)");
			$("#IIIC").attr("onclick", "rapChange(2)");
			$("#IVC").attr("onclick", "rapChange(3)");
			rapChange(choose);
			break;
	}
}
//rap线,OK
var rap_content = [
	"望长城内外",
	"把酒问青天",
	"主人何为言少钱",
	"巴山楚水凄凉地",
	"塞下秋来风景异",
	"空山新雨后"
];
var rap_choices = [
	["惟余莽莽", "二十四桥仍在,万夫莫开", "月满西楼", "兰泽多芳草"],
	["安得广厦千万间", "对影成三人", "怜取眼前人", "久作长安旅"],
	["人生失意无南北", "一度春光故旧新", "使人听此凋朱颜", "径须沽取对君酌"],
	["二十三年弃置身", "回崖沓嶂凌苍苍", "永夜独坐话蓬莱", "千村万落生荆杞"],
	["浅草才能没马蹄", "灵殿凄清,尽作寥然去", "白玉楼前几度春", "男儿到此是豪雄"],
	["双双金鹧鸪", "天气晚来秋", "略输文采,忧从中来", "古国重游,漫江碧透"]
];
var rap_answer = [3, 1, 0, 2, 3, 0, 3];
function rapChange(choose) {
	if (choose == rap_answer[question_order]) {
		rap++;
	}
	if (question_order == 6) {
		finish();
		return;
	}
	$("#char_content").html(rap_content[question_order]);
	$("#IC").html(rap_choices[question_order][0]);
	$("#IIC").html(rap_choices[question_order][1]);
	$("#IIIC").html(rap_choices[question_order][2]);
	$("#IVC").html(rap_choices[question_order][3]);
	question_order++;
}
//正常线, OK
var normal_content = [
	"江流天地外",
	"上有青冥之高天",
	"行宫见月伤心色",
	"愁肠已断无由醉",
	"庭轩寂寞近清明",
	"日日思君不见君"
];
var normal_choices = [
	["山色有无中", "五里一徘徊", "上与浮云齐", "所思在远道"],
	["几段人生苍茫路", "下有冲波逆折之回川", "渌水荡漾清猿啼", "下有渌水之波澜"],
	["白玉楼苑话世情", "总是悲风吹人怨", "夜雨闻铃肠断声", "暮来仅得坟与骨"],
	["遣黄犬,随君去", "酒未到,先成泪", "竹取短,须臾长", "载不动,许多愁"],
	["残花中酒,又是去年病", "万里长空,且为忠魂舞", "四桥尽是,老子经行处", "寒蝉鸣处,回首斜阳暮"],
	["无花无酒独相亲", "化作光明烛", "花鸟风月是非辨", "共饮长江水"],
];
var normal_answer = [2, 0, 3, 2, 1, 0, 3];
function norChange(choose) {
	if (choose == normal_answer[question_order]) {
		score++;
	}
	if (question_order == 6) {
		finish();
		return;
	}
	$("#char_content").html(normal_content[question_order]);
	$("#IC").html(normal_choices[question_order][0]);
	$("#IIC").html(normal_choices[question_order][1]);
	$("#IIIC").html(normal_choices[question_order][2]);
	$("#IVC").html(normal_choices[question_order][3]);
	question_order++;
}
//接头霸王 线
var head_content = [
	"小楼昨夜又东风",
	"树树皆秋色",
	"翠色和烟老",
	"狂风吹我心",
	"偏照化堂秋思",
	"月上柳梢头"
];
var head_choices = [
	["故国不堪回首月明中", "东风夜放花千树", "落花风雨更伤春", "西行有树名曰妖"],
	["山山唯落晖", "色は匂へど", "秋色连波,波上寒烟翠", "茫茫路何方"],
	["这就是最后一句你让我怎么接", "堪怨王孙,不记归期早", "客自何方,敢朝鬼神问人家?", "老夫聊发少年狂"],
	["心远地自偏", "西挂咸阳树", "自挂东南枝", "缺月挂疏桐"],
	["眉翠薄,鬓云残", "思君如明月", "秋山又几重", "寸寸柔肠,盈盈粉泪"],
	["人约黄昏后", "山头斜照却相迎", "头白鸳鸯失伴飞", "唯有青山似洛中"],
];
var head_answer = [1, 1, 2, 3, 0, 1, 2];
function headChange(choose) {
	if (choose == head_answer[question_order]) {
		head++;
	}
	if (question_order == 2 && choose == 1) {
		//选了日语选项
		head = 0;
		//更换按钮功能
		$("#IC").attr("onclick", "jpChange(0)");
		$("#IIC").attr("onclick", "jpChange(1)");
		$("#IIIC").attr("onclick", "jpChange(2)");
		$("#IVC").attr("onclick", "jpChange(3)");
		//更换按钮显示内容
		$("#IC").html(jp_choices[0]);
		$("#IIC").html(jp_choices[1]);
		$("#IIIC").html(jp_choices[2]);
		$("#IVC").html(jp_choices[3]);
		jpChange(-1);
		return;
	}
	if (question_order == 6) {
		finish();
		return;
	}
	$("#char_content").html(head_content[question_order]);
	$("#IC").html(head_choices[question_order][0]);
	$("#IIC").html(head_choices[question_order][1]);
	$("#IIIC").html(head_choices[question_order][2]);
	$("#IVC").html(head_choices[question_order][3]);
	question_order++;
}
var jp_content = [
	"跟我幽(líu)幽(huá)子(qiáng)拼日语,你有这个实力吗<br>秋の田の",
	"あしびきの",
	"田子の浦に",
	"秋風に"
];
var jp_choices = ["かりほの庵の", "山鳥の尾の", "うち出でて見れば", "たなびく雲の"];
var jp_answer = [-1, -1, -1, 0, 1, 2, 3];
function jpChange(choose) {
	if (choose == jp_answer[question_order]) {
		japan++;
	}
	if (question_order == 6) {
		finish();
		return;
	}
	$("#char_content").html(jp_content[question_order - 2]);
	question_order++;
}

//答题结束,给出评判结果
function finish() {
	//换背景
	$("#game").css("background-image", "url(./res/答题结束.jpg)");
	$("#left_lihui").remove();
	$("#right_lihui").attr("src", "./res/西行寺幽幽子（萃梦想立绘）嬉.png");
	$("#char_content").html("还是有两下子嘛. 且待我给你题一副封号~");
	$("#choice_frame").remove();
	$("#dialog").attr("onclick", "goEnding()");
	$("#dialog").css("cursor", "pointer");
}

function goEnding() {
	$("#game").remove();
	$("#end").show();
	//设置封号的字
	var word = $("#fenghao");
	if (score == 7) {
		word.html("当代诗仙");
	}
	else if (rap == 7) {
		word.html("诗词rapper");
	}
	else if (head == 7) {
		word.html("接头霸王");
	}
	else if (japan == 5) {
		word.html("日语的神");
	}
	else if (score == 0 && rap == 0 && head == 0 && japan == 0) {
		word.html("马科长");
	}
	else {
		word.html("寄");
	}
}