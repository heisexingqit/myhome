---
title: 指令笔记
---

# VITS-fast-fine-tuning *

> 文字   》》》 声音

链接地址：[VITS-fast-fine-tuning](https://github.com/Plachtaa/VITS-fast-fine-tuning)

作者：[Plachtaa](https://github.com/Plachtaa)

## 主要流程（Colab版）

```bash
# STEP 1 复制代码库
git clone https://github.com/Plachtaa/VITS-fast-fine-tuning.git
pip install imageio==2.4.1
pip install --upgrade youtube-dl
pip install moviepy
cd VITS-fast-fine-tuning
pip install -r requirements.txt
# build monotonic align
cd monotonic_align/
mkdir monotonic_align
python setup.py build_ext --inplace
cd ..
mkdir pretrained_models
# download data for fine-tuning
wget https://huggingface.co/datasets/Plachta/sampled_audio4ft/resolve/main/sampled_audio4ft_v2.zip
unzip sampled_audio4ft_v2.zip
# create necessary directories
mkdir video_data
mkdir raw_audio
mkdir denoised_audio
mkdir custom_character_voice
mkdir segmented_character_voice
```

```bash
# STEP 1.5 选择预训练模型
# 直接用 CJ 模型（中日）
wget https://huggingface.co/spaces/sayashi/vits-uma-genshin-honkai/resolve/main/model/D_0-p.pth -O ./pretrained_models/D_0.pth
wget https://huggingface.co/spaces/sayashi/vits-uma-genshin-honkai/resolve/main/model/G_0-p.pth -O ./pretrained_models/G_0.pth
wget https://huggingface.co/spaces/sayashi/vits-uma-genshin-honkai/resolve/main/model/config.json -O ./configs/finetune_speaker.json
```

```bash
# STEP 2 上传您的角色音频数据 
# 这里用github上的天降游戏短音频，并解压
wget https://github.com/Ikaros-521/VITS-fast-fine-tuning/releases/download/v1.0/default.zip -O ./custom_character_voice/custom_character_voice.zip
unzip ./custom_character_voice/custom_character_voice.zip -d ./custom_character_voice/
```

```bash
# STEP 3 自动处理所有上传的数据
# 将所有视频（无论是上传的还是下载的，且必须是.mp4格式）抽取音频（无）
# run video2audio.py
# 将所有音频（无论是上传的还是从视频抽取的，必须是.wav格式）去噪
python denoise_audio.py
# 分割并标注长音频（无）
# python long_audio_transcribe.py --languages "{PRETRAINED_MODEL}" --whisper_size large
# 标注短音频
python short_audio_transcribe.py --languages "{PRETRAINED_MODEL}" --whisper_size large
```

```bash
# STEP 3.5 训练前昔

# 以下情况请勾选：
# 总样本少于100条/样本包含角色只有1人/样本质量一般或较差/样本来自爬取的视频
# run preprocess_v2.py --languages "{PRETRAINED_MODEL}"

#以下情况可以不勾选：
#总样本量很大/样本质量很高/希望加速训练/只有二次元角色
# 选上吧
run preprocess_v2.py --add_auxiliary_data True --languages "{PRETRAINED_MODEL}"
```

```bash
# STEP 4 开始训练

reload_ext tensorboard
tensorboard --logdir "./OUTPUT_MODEL"
Maximum_epochs = "40" #@param [20, 40, 60, 80, 100, 150]
python finetune_speaker_v2.py -m "./OUTPUT_MODEL" --max_epochs "{Maximum_epochs}" --drop_speaker_embed True
```

止步于此，因此后面略....

# so-vits-svc

> 音乐   》》》 声音

链接地址：[so-vits-svc](https://github.com/svc-develop-team/so-vits-svc)

作者：[svc-develop-team](https://github.com/svc-develop-team)

```bash
# 预处理
git clone -b 4.0 https://github.com/svc-develop-team/so-vits-svc.git
cd ./so-vits-svc
# 必须项
wget http://obs.cstcloud.cn/share/obs/sankagenkeshi/checkpoint_best_legacy_500.pt -O ./hubert/checkpoint_best_legacy_500.pt
# 底模（超难）
wget https://huggingface.co/kingple/sovits4/resolve/main/G_0.pth -O ./logs/44k/G_0.pth
wget https://huggingface.co/kingple/sovits4/resolve/main/D_0.pth -O ./logs/44k/D_0.pth
# 下载音频
wget https://github.com/Ikaros-521/VITS-fast-fine-tuning/releases/download/v1.0/default.zip -O ./dataset_raw/custom_character_voice.zip
unzip ./dataset_raw/custom_character_voice.zip -d ./dataset_raw/
# 预处理三句话
python resample.py
python preprocess_flist_config.py
python preprocess_hubert_f0.py
# 可以调节配置config.json的keep_ckpts参数，表示保留n个模型，0为所有，默认3
# 训练
python train.py -c configs/config.json -m 44k
# 推理
python inference_main.py -m "logs/44k/G_xx.pth" -c "configs/config.json" -n "aa.wav" -t 0 -s "ikaros"
# 可加 -eh True，增强
```

