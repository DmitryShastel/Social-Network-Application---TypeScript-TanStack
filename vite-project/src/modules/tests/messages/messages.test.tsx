import {describe, expect, it, vi} from 'vitest';

describe('Handlers should be work properly in Message component', () => {
    it('handlerOnchange should update value', () => {
        const setValueMock = vi.fn();

        const mockEvent = {
            currentTarget: {
                value: 'test message'
            }
        } as React.ChangeEvent<HTMLInputElement>;

        const handlerOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueMock(e.currentTarget.value);
        };

        handlerOnchange(mockEvent);

        expect(setValueMock).toHaveBeenCalledWith('test message');
    });

    it('handleSendMessage should not send empty message', () => {
        const sendMessageMock = vi.fn();
        const setMessagesMock = vi.fn();
        const setValueMock = vi.fn();

        const handleSendMessage = (value: string) => {
            if (!value.trim()) return;

            sendMessageMock(value);
            setMessagesMock((prev: any[]) => [...prev, {id: Date.now(), text: value}]);
            setValueMock('');
        };

        handleSendMessage('');
        handleSendMessage('   ');

        expect(sendMessageMock).not.toHaveBeenCalled();
        expect(setMessagesMock).not.toHaveBeenCalled();
        expect(setValueMock).not.toHaveBeenCalled();

        handleSendMessage('Hello!');

        expect(sendMessageMock).toHaveBeenCalledWith('Hello!');
        expect(setValueMock).toHaveBeenCalledWith('');
    });

    it('handleKeyPress should send message on Enter key', () => {
        const preventDefaultMock = vi.fn();
        const handleSendMessageMock = vi.fn();

        const handleKeyPress = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessageMock();
            }
        };

        const enterEvent = {
            key: 'Enter',
            shiftKey: false,
            preventDefault: preventDefaultMock,
        } as unknown as React.KeyboardEvent;

        handleKeyPress(enterEvent);

        expect(preventDefaultMock).toHaveBeenCalled();
        expect(handleSendMessageMock).toHaveBeenCalled();

        vi.clearAllMocks();
        const shiftEnterEvent = {
            key: 'Enter',
            shiftKey: true,
            preventDefault: preventDefaultMock,
        } as unknown as React.KeyboardEvent;

        handleKeyPress(shiftEnterEvent);

        expect(preventDefaultMock).not.toHaveBeenCalled();
        expect(handleSendMessageMock).not.toHaveBeenCalled();

        vi.clearAllMocks();
        const otherKeyEvent = {
            key: 'a',
            shiftKey: false,
            preventDefault: preventDefaultMock,
        } as unknown as React.KeyboardEvent;

        handleKeyPress(otherKeyEvent);

        expect(preventDefaultMock).not.toHaveBeenCalled();
        expect(handleSendMessageMock).not.toHaveBeenCalled();
    });
});