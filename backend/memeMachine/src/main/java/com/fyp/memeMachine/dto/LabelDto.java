package com.fyp.memeMachine.dto;

public class LabelDto {
    private Long memeId;
    private String memeUrl; // optional: allows sending the image URL or filename
    private String userId;
    private String emotion;
    private String sentiment;

    public LabelDto() {
    }

    public Long getMemeId() {
        return memeId;
    }

    public void setMemeId(Long memeId) {
        this.memeId = memeId;
    }

    public String getMemeUrl() {
        return memeUrl;
    }

    public void setMemeUrl(String memeUrl) {
        this.memeUrl = memeUrl;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmotion() {
        return emotion;
    }

    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }
}
