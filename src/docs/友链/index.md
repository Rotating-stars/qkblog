---
layout: page
---
<script setup>
import {
	VPTeamPage,
	VPTeamPageTitle,
	VPTeamMembers,
	VPTeamPageSection
} from 'vitepress/theme'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import qk from './头像/qk.jpg'

const coreMembers = [
	{
		avatar: qk, name: "青空", title: "本站作者",
		org: "青空的Blog", orgLink: "https://space.bilibili.com/293751618", 
		desc: "谨以此书纪念我的童年，那是一段小有遗憾的幸福时光。",
		links: [{icon: 'bilibili', link: 'https://space.bilibili.com/293751618'},
				{icon: 'github', link: 'https://github.com/Rotating-stars'},],
	},
];
</script>

<VPTeamPageTitle>
  <template #title>友链</template>
</VPTeamPageTitle>
<VPTeamMembers size="medium" :members="coreMembers" />
<div style="margin-top: 40px;"></div>
<VPTeamPageSection>
	<template #title>交换友链</template>
	<template #lead></template>
</VPTeamPageSection>
<div style="max-width: 200px; margin: 0 auto; margin-top: 20px;">
	<el-button type="primary" :icon="Share" style="width: 200px; height: 50px; font-size: 16px"
		onclick="window.location.href='添加友链.html'">点击这里</el-button>
</div>