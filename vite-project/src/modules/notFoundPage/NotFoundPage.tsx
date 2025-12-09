import {useRouter} from "@tanstack/react-router";
import * as S from "../notFoundPage/notFoundPage";

export const NotFoundPage = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.navigate({to: '/'});
    };

    const handleGoBack = () => {
        router.history.back();
    };

    return (
        <S.NotFoundContainer>
            <S.Illustration/>

            <S.ErrorCode>404</S.ErrorCode>
            <S.ErrorTitle>This page not found</S.ErrorTitle>

            <S.ErrorMessage>
                Unfortunately, the page you are looking for does not exist, it has been moved.
                or temporarily unavailable.
            </S.ErrorMessage>

            <S.ButtonGroup>
                <S.Button onClick={handleGoBack} variant="secondary">
                    Back
                </S.Button>

                <S.Button onClick={handleGoHome} variant="primary">
                    Home
                </S.Button>
            </S.ButtonGroup>
        </S.NotFoundContainer>
    );
};